import { Injectable } from '@nestjs/common';
import { CalculationService } from '../calculation/calculation.service';

@Injectable()
export class VotingIntentionService {
  constructor(private calculationService: CalculationService) {}

  async getVotingIntentionOverTime(): Promise<any> {
    return await this.calculationService.getEvolutionOverTime();
  }
}
