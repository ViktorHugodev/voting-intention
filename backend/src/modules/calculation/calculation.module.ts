import { Module } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { CalculationController } from './calculation.controller';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { PrismaModule } from 'src/providers/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CalculationService, PrismaService],
  controllers: [CalculationController],
  exports: [CalculationService],
})
export class CalculationModule {}
