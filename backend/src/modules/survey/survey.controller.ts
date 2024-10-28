import { Controller, Get, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.surveyService.findOne(+id);
  }
}
