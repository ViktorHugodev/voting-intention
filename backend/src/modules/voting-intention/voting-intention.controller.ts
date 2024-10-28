import { Controller, Get } from '@nestjs/common';
import { VotingIntentionService } from './voting-intention.service';

@Controller('voting-intention')
export class VotingIntentionController {
  constructor(private votingIntentionService: VotingIntentionService) {}

  @Get('evolution')
  async getEvolution() {
    try {
      const data =
        await this.votingIntentionService.getVotingIntentionOverTime();
      return data;
    } catch (error) {
      console.error('Erro ao obter evolução:', error);
      throw error;
    }
  }
}
