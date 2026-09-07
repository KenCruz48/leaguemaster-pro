import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Equipo } from '../equipos/entities/equipo.entity';
import { Estadio } from '../estadios/entities/estadio.entity';
import { Partido } from './entities/partido.entity';
import { PartidosService } from './partidos.service';

const partidosRepositoryMock = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

const equiposRepositoryMock = {
  findOne: jest.fn(),
};

const estadiosRepositoryMock = {
  findOne: jest.fn(),
};

describe('PartidosService', () => {
  let service: PartidosService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartidosService,
        { provide: getRepositoryToken(Partido), useValue: partidosRepositoryMock },
        { provide: getRepositoryToken(Equipo), useValue: equiposRepositoryMock },
        { provide: getRepositoryToken(Estadio), useValue: estadiosRepositoryMock },
      ],
    }).compile();

    service = module.get<PartidosService>(PartidosService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('rechaza un partido con el mismo equipo como local y visitante', async () => {
    await expect(
      service.crear({
        equipoLocalId: 1,
        equipoVisitanteId: 1,
        estadioId: 1,
        fecha: '2026-09-10T18:00:00.000Z',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(partidosRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('rechaza un partido si una referencia no existe', async () => {
    equiposRepositoryMock.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: 2 });
    estadiosRepositoryMock.findOne.mockResolvedValue({ id: 1 });

    await expect(
      service.crear({
        equipoLocalId: 1,
        equipoVisitanteId: 2,
        estadioId: 1,
        fecha: '2026-09-10T18:00:00.000Z',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(partidosRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('crea un partido cuando las referencias son válidas', async () => {
    equiposRepositoryMock.findOne.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce({ id: 2 });
    estadiosRepositoryMock.findOne.mockResolvedValue({ id: 3 });

    const partido = {
      id: 10,
      equipoLocalId: 1,
      equipoVisitanteId: 2,
      estadioId: 3,
    };

    partidosRepositoryMock.create.mockReturnValue(partido);
    partidosRepositoryMock.save.mockResolvedValue(partido);

    await expect(
      service.crear({
        equipoLocalId: 1,
        equipoVisitanteId: 2,
        estadioId: 3,
        fecha: '2026-09-10T18:00:00.000Z',
      }),
    ).resolves.toEqual(partido);
  });
});
