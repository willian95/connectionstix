import { Test, TestingModule } from '@nestjs/testing';
import { ConfigcmsService } from './configcms.service';

describe('ConfigcmsService', () => {
  let service: ConfigcmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigcmsService],
    }).compile();

    service = module.get<ConfigcmsService>(ConfigcmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
