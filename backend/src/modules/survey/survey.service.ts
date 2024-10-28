import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.survey.findMany({
      include: {
        // municipality: true,
        votes: {
          include: {
            candidate: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.survey.findUnique({
      where: { id },
      include: {
        municipality: true,
        votes: {
          include: {
            candidate: true,
          },
        },
      },
    });
  }
}
