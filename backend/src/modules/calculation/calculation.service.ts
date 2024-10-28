import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Municipality, Candidate } from '@prisma/client';

interface CandidateResults {
  [candidateId: number]: number;
}

interface SizeGroupResults {
  totalPopulation: number;
  totalVotes: number;
  candidateVotes: CandidateResults;
}
interface SurveyWithVotes {
  id: number;
  surveyId: string;
  date: Date;
  municipalityId: number;
  municipality: Municipality;
  votes: VoteWithCandidate[];
}

interface VoteWithCandidate {
  id: number;
  candidateId: number;
  percentage: number;
  surveyId: number;
  candidate: Candidate;
}
interface StateResults {
  [sizeGroup: number]: SizeGroupResults;
}

@Injectable()
export class CalculationService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateVoteIntentions(): Promise<{ [candidateId: number]: number }> {
    // Obter todas as pesquisas com votos, dados do município e estado
    const surveys = await this.prisma.survey.findMany({
      include: {
        votes: true,
        municipality: {
          include: {
            state: true,
          },
        },
      },
    });

    // Estrutura para armazenar os resultados agregados por estado e grupo de porte
    const stateGroupData: { [stateId: number]: StateResults } = {};

    // Processar cada pesquisa
    for (const survey of surveys) {
      const population = survey.municipality.population;
      const stateId = survey.municipality.state.id;

      // Verificar se a população está definida
      if (!population || population === 0) {
        continue; // Ignorar pesquisas sem população definida
      }

      // Determinar o grupo de porte do município
      const sizeGroup = this.determineSizeGroup(population);

      // Inicializar a estrutura para o estado, se necessário
      if (!stateGroupData[stateId]) {
        stateGroupData[stateId] = {};
      }

      // Inicializar a estrutura para o grupo de porte, se necessário
      if (!stateGroupData[stateId][sizeGroup]) {
        stateGroupData[stateId][sizeGroup] = {
          totalPopulation: 0,
          totalVotes: 0,
          candidateVotes: {},
        };
      }

      const groupData = stateGroupData[stateId][sizeGroup];

      // Acumular a população total do grupo
      groupData.totalPopulation += population;

      // Acumular os votos de cada candidato no grupo
      for (const vote of survey.votes) {
        const candidateId = vote.candidateId;

        // Incrementar o total de votos no grupo
        groupData.totalVotes += 1;

        if (!groupData.candidateVotes[candidateId]) {
          groupData.candidateVotes[candidateId] = 0;
        }

        // Incrementar o número de votos do candidato no grupo
        groupData.candidateVotes[candidateId] += 1;
      }
    }

    // Estrutura para armazenar os resultados finais
    const finalResults: { [candidateId: number]: number } = {};
    let totalPopulation = 0;

    // Processar os dados agregados para calcular as intenções de voto
    for (const stateId in stateGroupData) {
      const groups = stateGroupData[stateId];

      for (const sizeGroup in groups) {
        const groupData = groups[sizeGroup];

        // Acumular a população total
        totalPopulation += groupData.totalPopulation;

        // Calcular a proporção de votos de cada candidato no grupo
        for (const candidateId in groupData.candidateVotes) {
          const votesForCandidate = groupData.candidateVotes[candidateId];
          const candidateProportion = votesForCandidate / groupData.totalVotes;

          // Estimar o número de votos para o candidato no grupo
          const estimatedVotes =
            candidateProportion * groupData.totalPopulation;

          if (!finalResults[candidateId]) {
            finalResults[candidateId] = 0;
          }

          // Acumular os votos estimados no resultado final
          finalResults[candidateId] += estimatedVotes;
        }
      }
    }

    // Calcular o percentual final para cada candidato
    const percentageResults: { [candidateId: number]: number } = {};
    for (const candidateId in finalResults) {
      percentageResults[candidateId] =
        (finalResults[candidateId] / totalPopulation) * 100;
    }

    return percentageResults;
  }
  // Novo método para obter a evolução das intenções de voto
  async getEvolutionOverTime(): Promise<any> {
    // Consultar todas as pesquisas com votos, incluindo dados do candidato
    const surveys: SurveyWithVotes[] = await this.prisma.survey.findMany({
      include: {
        municipality: true, // Se precisar dos dados do município
        votes: {
          include: {
            candidate: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Estrutura para armazenar os resultados
    const evolutionData = [];

    // Processar cada pesquisa
    for (const survey of surveys) {
      const surveyDate = survey.date.toISOString().split('T')[0]; // Formata a data para YYYY-MM-DD

      // Verificar se já existe um registro para essa data
      let dateEntry = evolutionData.find((entry) => entry.date === surveyDate);

      if (!dateEntry) {
        dateEntry = { date: surveyDate };
        evolutionData.push(dateEntry);
      }

      // Processar os votos da pesquisa
      for (const vote of survey.votes) {
        const candidateName = vote.candidate.name;

        if (!dateEntry[candidateName]) {
          dateEntry[candidateName] = 0;
        }

        // Acumular a porcentagem de votos do candidato
        dateEntry[candidateName] =
          (dateEntry[candidateName] as number) + vote.percentage;
      }
    }

    // Opcional: Calcular a média das porcentagens se houver múltiplas pesquisas na mesma data
    // for (const entry of evolutionData) {
    //   const candidateNames = Object.keys(entry).filter((key) => key !== 'date');

    //   for (const candidateName of candidateNames) {
    //     // Se houver múltiplas entradas para o mesmo candidato na mesma data, você pode calcular a média aqui
    //     // Neste exemplo, assumimos que não há duplicatas ou que a soma já representa o valor correto
    //   }
    // }

    return evolutionData;
  }

  // Método auxiliar existente

  // Função para determinar o grupo de porte com base na população
  private determineSizeGroup(population: number): number {
    if (population <= 20000) {
      return 1; // Grupo 1
    } else if (population > 20000 && population <= 100000) {
      return 2; // Grupo 2
    } else if (population > 100000 && population <= 1000000) {
      return 3; // Grupo 3
    } else {
      return 4; // Grupo 4
    }
  }
}
