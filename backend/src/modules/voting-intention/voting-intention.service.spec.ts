import { Test, TestingModule } from '@nestjs/testing';
import { VotingIntentionService } from './voting-intention.service';

describe('VotingIntentionService', () => {
  let service: VotingIntentionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingIntentionService],
    }).compile();

    service = module.get<VotingIntentionService>(VotingIntentionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
