import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Estadio } from './entities/estadio.entity';
import { EstadiosService } from './estadios.service';

describe('EstadiosService', () => {
  let service: EstadiosService;

  const estadiosRepositoryMock = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstadiosService,
        {
          provide: getRepositoryToken(Estadio),
          useValue: estadiosRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<EstadiosService>(EstadiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
