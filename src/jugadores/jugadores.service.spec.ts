import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Equipo } from '../equipos/entities/equipo.entity';
import { Jugador } from './entities/jugador.entity';
import { JugadoresService } from './jugadores.service';

describe('JugadoresService', () => {
  let service: JugadoresService;

  const jugadoresRepositoryMock = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const equiposRepositoryMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JugadoresService,
        {
          provide: getRepositoryToken(Jugador),
          useValue: jugadoresRepositoryMock,
        },
        {
          provide: getRepositoryToken(Equipo),
          useValue: equiposRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<JugadoresService>(JugadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
