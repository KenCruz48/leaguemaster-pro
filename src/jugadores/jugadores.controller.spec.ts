import { Test, TestingModule } from '@nestjs/testing';

import { JugadoresController } from './jugadores.controller';
import { JugadoresService } from './jugadores.service';

describe('JugadoresController', () => {
  let controller: JugadoresController;

  const jugadoresServiceMock = {
    crear: jest.fn(),
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    actualizar: jest.fn(),
    eliminar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JugadoresController],
      providers: [
        {
          provide: JugadoresService,
          useValue: jugadoresServiceMock,
        },
      ],
    }).compile();

    controller = module.get<JugadoresController>(JugadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
