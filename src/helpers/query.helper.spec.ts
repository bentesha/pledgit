import { Test, TestingModule } from '@nestjs/testing';
import { QueryHelper } from './query.helper';

describe('QueryHelper', () => {
  let provider: QueryHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryHelper],
    }).compile();

    provider = module.get<QueryHelper>(QueryHelper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
