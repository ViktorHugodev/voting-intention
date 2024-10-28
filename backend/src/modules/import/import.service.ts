import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import * as fs from 'fs';
import csv from 'csv-parser';
import removeAccents from 'remove-accents';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);

  constructor(private readonly prisma: PrismaService) {}

  async importCSV(file: Express.Multer.File): Promise<void> {
    const results = [];
    const readStream = fs.createReadStream(file.path, { encoding: 'utf8' });

    this.logger.log(`Caminho do arquivo CSV: ${file.path}`);

    readStream
      .on('error', (error) => {
        this.logger.error('Erro ao ler o arquivo', error);
      })
      .pipe(
        csv({
          separator: ';',
          headers: [
            'ID_PESQUISA',
            'DATA_PESQUISA',
            'MUNICÍPIO',
            'ESTADO',
            'INTENÇÃO DE VOTO',
          ],
          skipLines: 0,
          mapHeaders: ({ header }) => header.trim(),
        }),
      )
      .on('error', (error) => {
        this.logger.error('Erro no csv-parser', error);
      })
      .on('data', (data) => {
        if (Object.values(data).some((value) => value !== '')) {
          results.push(data);
        }
      })
      .on('end', async () => {
        this.logger.log('Início do processamento dos dados CSV');

        for (const item of results) {
          try {
            this.logger.log(`Processando item: ${JSON.stringify(item)}`);

            // Extrair e validar os campos
            const ID_PESQUISA = item['ID_PESQUISA'];
            const DATA_PESQUISA = item['DATA_PESQUISA'];
            const MUNICIPIO = item['MUNICÍPIO'];
            const ESTADO = item['ESTADO'];
            const INTENCAO_DE_VOTO = item['INTENÇÃO DE VOTO'];

            // Verifique se todos os campos necessários estão presentes
            if (
              !ID_PESQUISA ||
              !DATA_PESQUISA ||
              !MUNICIPIO ||
              !ESTADO ||
              !INTENCAO_DE_VOTO
            ) {
              this.logger.warn(
                `Dados incompletos no item: ${JSON.stringify(item)}`,
              );
              continue; // Pula para o próximo item
            }

            // Normalizar nomes para evitar problemas com acentuação
            const municipioNomeNormalizado =
              removeAccents(MUNICIPIO).toLowerCase();
            const estadoSiglaNormalizada = removeAccents(ESTADO).toUpperCase();

            // Converter a data para o formato correto (YYYY-MM-DD)
            const dataParts = DATA_PESQUISA.split('/');
            const dataPesquisa = new Date(
              `${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`,
            );

            // Buscar o estado no banco de dados
            const estado = await this.prisma.state.findUnique({
              where: { abbreviation: estadoSiglaNormalizada },
            });

            if (!estado) {
              this.logger.warn(
                `Estado não encontrado: ${estadoSiglaNormalizada}`,
              );
              continue;
            }

            // Buscar todos os municípios do estado
            const municipiosDoEstado = await this.prisma.municipality.findMany({
              where: {
                stateId: estado.id,
              },
            });

            // Encontrar o município comparando os nomes normalizados
            const municipio = municipiosDoEstado.find((m) => {
              const nomeNormalizadoBanco = removeAccents(m.name).toLowerCase();
              return nomeNormalizadoBanco === municipioNomeNormalizado;
            });

            if (!municipio) {
              this.logger.warn(
                `Município não encontrado: ${MUNICIPIO} - ${estadoSiglaNormalizada}`,
              );
              continue;
            }

            // Criar ou encontrar a pesquisa com base em surveyId e municipalityId
            const pesquisa = await this.prisma.survey.upsert({
              where: {
                surveyId_municipalityId_unique: {
                  surveyId: ID_PESQUISA,
                  municipalityId: municipio.id,
                },
              },
              update: {},
              create: {
                surveyId: ID_PESQUISA,
                date: dataPesquisa,
                municipalityId: municipio.id,
              },
            });

            // Converter a intenção de voto para um ID de candidato
            const candidateId = this.convertLetterToId(INTENCAO_DE_VOTO);

            // Verificar se o candidato existe
            let candidato = await this.prisma.candidate.findUnique({
              where: { id: candidateId },
            });

            // Se o candidato não existir, criá-lo
            if (!candidato) {
              candidato = await this.prisma.candidate.create({
                data: {
                  id: candidateId,
                  name: `Candidato ${INTENCAO_DE_VOTO.toUpperCase()}`,
                },
              });
              this.logger.log(
                `Candidato ${candidato.name} criado com ID ${candidato.id}.`,
              );
            }

            // Criar o registro de voto
            await this.prisma.vote.create({
              data: {
                candidateId: candidato.id,
                percentage: 1, // Assume-se que cada registro representa um voto
                surveyId: pesquisa.id,
              },
            });

            this.logger.log(
              `Voto registrado para o candidato ${INTENCAO_DE_VOTO} na pesquisa ID: ${ID_PESQUISA}, município: ${MUNICIPIO}`,
            );
          } catch (error) {
            this.logger.error(
              `Erro ao processar o item: ${JSON.stringify(item)}`,
              error,
            );
          }
        }

        this.logger.log('Processamento dos dados CSV concluído');
      });
  }

  private convertLetterToId(letter: string): number {
    // Converter letra para um ID numérico (exemplo: 'A' -> 1, 'B' -> 2)
    return letter.toUpperCase().charCodeAt(0) - 64;
  }
}
