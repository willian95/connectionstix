import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionTestController } from './connection-test.controller';

describe('ConnectionTestController', () => {
  let controller: ConnectionTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionTestController],
    }).compile();

    controller = module.get<ConnectionTestController>(ConnectionTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
