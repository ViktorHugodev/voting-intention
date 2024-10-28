import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VotingIntentionService } from './voting-intention.service';
import { CalculationModule } from '../calculation/calculation.module';
import { VotingIntentionController } from './voting-intention.controller';
@Module({
  imports: [HttpModule, CalculationModule],
  providers: [VotingIntentionService],
  controllers: [VotingIntentionController],
  exports: [VotingIntentionService],
})
export class VotingIntentionModule {}
