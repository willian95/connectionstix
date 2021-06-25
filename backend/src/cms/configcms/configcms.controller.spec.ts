import { Test, TestingModule } from '@nestjs/testing';
import { ConfigcmsController } from './configcms.controller';
import { ConfigcmsService } from './configcms.service';

describe('ConfigcmsController', () => {
  let controller: ConfigcmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigcmsController],
      providers: [ConfigcmsService],
    }).compile();

    controller = module.get<ConfigcmsController>(ConfigcmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
