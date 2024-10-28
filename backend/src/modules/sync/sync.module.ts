import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  providers: [SyncService, PrismaService],
  controllers: [SyncController],
})
export class SyncModule {}
