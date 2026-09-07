import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { EventosService } from './eventos.service';
import { EventoPartido } from './entities/evento-partido.entity';
import { Partido } from '../partidos/entities/partido.entity';
import { Jugador } from '../jugadores/entities/jugador.entity';
import { TipoEvento } from './enums/tipo-evento.enum';

describe('EventosService', () => {
  let service: EventosService;

  const eventosRepositoryMock = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const partidosRepositoryMock = {
    findOne: jest.fn(),
  };

  const jugadoresRepositoryMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventosService,
        {
          provide: getRepositoryToken(EventoPartido),
          useValue: eventosRepositoryMock,
        },
        {
          provide: getRepositoryToken(Partido),
          useValue: partidosRepositoryMock,
        },
        {
          provide: getRepositoryToken(Jugador),
          useValue: jugadoresRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<EventosService>(EventosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('acepta un evento si el jugador pertenece al equipo local', async () => {
    const partido = {
      id: 1,
      equipoLocalId: 1,
      equipoVisitanteId: 2,
    };

    const jugador = {
      id: 1,
      equipo: {
        id: 1,
      },
    };

    const dto = {
      tipo: TipoEvento.GOL,
      minuto: 35,
      jugadorId: 1,
    };

    const eventoGuardado = {
      id: 1,
      ...dto,
      partido,
      jugador,
    };

    partidosRepositoryMock.findOne.mockResolvedValue(partido);
    jugadoresRepositoryMock.findOne.mockResolvedValue(jugador);
    eventosRepositoryMock.create.mockReturnValue(eventoGuardado);
    eventosRepositoryMock.save.mockResolvedValue(eventoGuardado);

    const resultado = await service.crear(1, dto);

    expect(resultado).toEqual(eventoGuardado);
    expect(eventosRepositoryMock.save).toHaveBeenCalled();
  });

  it('acepta un evento si el jugador pertenece al equipo visitante', async () => {
    const partido = {
      id: 1,
      equipoLocalId: 1,
      equipoVisitanteId: 2,
    };

    const jugador = {
      id: 2,
      equipo: {
        id: 2,
      },
    };

    const dto = {
      tipo: TipoEvento.TARJETA_AMARILLA,
      minuto: 51,
      jugadorId: 2,
    };

    const eventoGuardado = {
      id: 2,
      ...dto,
      partido,
      jugador,
    };

    partidosRepositoryMock.findOne.mockResolvedValue(partido);
    jugadoresRepositoryMock.findOne.mockResolvedValue(jugador);
    eventosRepositoryMock.create.mockReturnValue(eventoGuardado);
    eventosRepositoryMock.save.mockResolvedValue(eventoGuardado);

    const resultado = await service.crear(1, dto);

    expect(resultado).toEqual(eventoGuardado);
    expect(eventosRepositoryMock.save).toHaveBeenCalled();
  });

  it('rechaza un jugador que pertenece a un tercer equipo', async () => {
    const partido = {
      id: 1,
      equipoLocalId: 1,
      equipoVisitanteId: 2,
    };

    const jugador = {
      id: 3,
      equipo: {
        id: 3,
      },
    };

    const dto = {
      tipo: TipoEvento.GOL,
      minuto: 60,
      jugadorId: 3,
    };

    partidosRepositoryMock.findOne.mockResolvedValue(partido);
    jugadoresRepositoryMock.findOne.mockResolvedValue(jugador);

    await expect(service.crear(1, dto)).rejects.toBeInstanceOf(
      BadRequestException,
    );

    expect(eventosRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('rechaza si el partido no existe', async () => {
    partidosRepositoryMock.findOne.mockResolvedValue(null);

    const dto = {
      tipo: TipoEvento.GOL,
      minuto: 35,
      jugadorId: 1,
    };

    await expect(service.crear(999, dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('rechaza si el jugador no existe', async () => {
    const partido = {
      id: 1,
      equipoLocalId: 1,
      equipoVisitanteId: 2,
    };

    partidosRepositoryMock.findOne.mockResolvedValue(partido);
    jugadoresRepositoryMock.findOne.mockResolvedValue(null);

    const dto = {
      tipo: TipoEvento.GOL,
      minuto: 35,
      jugadorId: 999,
    };

    await expect(service.crear(1, dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});