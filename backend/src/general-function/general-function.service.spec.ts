import { Test, TestingModule } from '@nestjs/testing';
import { GeneralFunctionService } from './general-function.service';

describe('GeneralFunctionService', () => {
  let service: GeneralFunctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralFunctionService],
    }).compile();

    service = module.get<GeneralFunctionService>(GeneralFunctionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
