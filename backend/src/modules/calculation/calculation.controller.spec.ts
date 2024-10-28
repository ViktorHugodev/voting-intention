import { Test, TestingModule } from '@nestjs/testing';
import { CalculationController } from './calculation.controller';
import { CalculationService } from './calculation.service';

describe('CalculationController', () => {
  let controller: CalculationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculationController],
      providers: [CalculationService],
    }).compile();

    controller = module.get<CalculationController>(CalculationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
