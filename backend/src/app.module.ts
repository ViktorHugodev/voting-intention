import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportModule } from './modules/import/import.module';
import { SyncModule } from './modules/sync/sync.module';
import { PrismaService } from './providers/prisma/prisma.service';
import { CalculationModule } from './modules/calculation/calculation.module';
import { VotingIntentionModule } from './modules/voting-intention/voting-intention.module';

import { SurveyModule } from './modules/survey/survey.module';

@Module({
  imports: [
    ImportModule,
    SyncModule,
    CalculationModule,
    SurveyModule,
    VotingIntentionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
