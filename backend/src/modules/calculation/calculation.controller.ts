import { Controller, Get } from '@nestjs/common';
import { CalculationService } from './calculation.service';

@Controller('calculation')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Get('calculate')
  async calcularIntencoesVoto() {
    const resultados = await this.calculationService.calculateVoteIntentions();
    return resultados;
  }
}
