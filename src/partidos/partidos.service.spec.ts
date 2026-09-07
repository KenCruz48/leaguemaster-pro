import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Partido } from './entities/partido.entity';
import { PartidosService } from './partidos.service';

describe('PartidosService', () => {
  let service: PartidosService;

  const partidosRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          PartidosService,
          {
            provide: getRepositoryToken(Partido),
            useValue: partidosRepositoryMock,
          },
        ],
      }).compile();

    service = module.get<PartidosService>(
      PartidosService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});