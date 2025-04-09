import { Test, TestingModule } from '@nestjs/testing';
import { PrefeiturasController } from './prefeituras.controller';

describe('PrefeiturasController', () => {
  let controller: PrefeiturasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrefeiturasController],
    }).compile();

    controller = module.get<PrefeiturasController>(PrefeiturasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
