import { Test, TestingModule } from '@nestjs/testing';
import { PrefeiturasService } from './prefeituras.service';

describe('PrefeiturasService', () => {
  let service: PrefeiturasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrefeiturasService],
    }).compile();

    service = module.get<PrefeiturasService>(PrefeiturasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
