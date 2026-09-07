import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { EquiposService } from './equipos.service';
import { Equipo } from './entities/equipo.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

describe('EquiposService', () => {
  let service: EquiposService;

  const equiposRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const categoriasRepositoryMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          EquiposService,
          {
            provide: getRepositoryToken(Equipo),
            useValue: equiposRepositoryMock,
          },
          {
            provide: getRepositoryToken(Categoria),
            useValue: categoriasRepositoryMock,
          },
        ],
      }).compile();

    service =
      module.get<EquiposService>(
        EquiposService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});