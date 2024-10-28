import { Controller, Post } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('update-base')
  async updateBase() {
    await this.syncService.syncStatesAndMunicipalities();
    return {
      message: 'States and municipalities database updated successfully.',
    };
  }
}
