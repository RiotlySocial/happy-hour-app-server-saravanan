import { Test, TestingModule } from '@nestjs/testing';
import { TableController } from './table.controller';

describe('Table Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TableController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TableController = module.get<TableController>(TableController);
    expect(controller).toBeDefined();
  });
});
