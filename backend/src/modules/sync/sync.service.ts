import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  constructor(private readonly prisma: PrismaService) {}

  async syncStatesAndMunicipalities(): Promise<void> {
    // Obter os estados
    const statesResponse = await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    );
    const states = statesResponse.data;

    // Atualizar os estados no banco
    await this.prisma.state.createMany({
      data: states.map((state) => ({
        id: parseInt(state.id),
        name: state.nome,
        abbreviation: state.sigla,
      })),
      skipDuplicates: true,
    });

    this.logger.log('Estados sincronizados com sucesso.');

    // Obter os municípios
    const municipalitiesResponse = await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
    );
    const municipalities = municipalitiesResponse.data;

    // Atualizar os municípios no banco
    await this.prisma.municipality.createMany({
      data: municipalities.map((municipality) => ({
        id: parseInt(municipality.id),
        name: municipality.nome,
        stateId: parseInt(municipality.microrregiao.mesorregiao.UF.id),
        population: 0, // Será atualizado posteriormente
      })),
      skipDuplicates: true,
    });

    this.logger.log('Municípios sincronizados com sucesso.');

    // Atualizar a população dos municípios usando o JSON
    const jsonFilePath = path.join(process.cwd(), 'estimativa-2024.json');
    console.log('Caminho para o arquivo JSON:', jsonFilePath);
    const rawData = fs.readFileSync(jsonFilePath, 'utf-8');
    const municipiosData = JSON.parse(rawData);

    // Extrair o array de municípios
    const municipiosArray = municipiosData['MUNICÍPIOS'];

    // Pular o primeiro item (cabeçalho)
    const municipios = municipiosArray.slice(1);

    // Criar um mapa de população por ID do município
    const populacaoPorMunicipioId = new Map<number, number>();

    for (const municipio of municipios) {
      // Extrair os dados necessários
      const codUf = municipio['Column2'];
      const codMunicipio = municipio['Column3'];
      const populacaoEstimada = municipio['Column5'];

      // Verificar se os dados são válidos
      if (codUf && codMunicipio && populacaoEstimada) {
        // Construir o ID do município (Código IBGE)
        const municipioId = parseInt(
          codUf.toString().padStart(2, '0') +
            codMunicipio.toString().padStart(5, '0'),
        );

        // Adicionar ao mapa
        populacaoPorMunicipioId.set(municipioId, populacaoEstimada);
      } else {
        this.logger.warn(
          `Dados incompletos para o município com código: ${codMunicipio}`,
        );
      }
    }

    // Atualizar a população dos municípios no banco de dados
    const allMunicipalities = await this.prisma.municipality.findMany();

    for (const municipality of allMunicipalities) {
      const population = populacaoPorMunicipioId.get(municipality.id);
      if (population) {
        await this.prisma.municipality.update({
          where: { id: municipality.id },
          data: { population },
        });
        this.logger.log(
          `População atualizada para o município ID: ${municipality.id} - População: ${population}`,
        );
      } else {
        this.logger.warn(
          `População não encontrada para o município ID: ${municipality.id}`,
        );
      }
    }
  }
}
