import { Test, TestingModule } from '@nestjs/testing';

import { PartidosController } from './partidos.controller';
import { PartidosService } from './partidos.service';

describe('PartidosController', () => {
  let controller: PartidosController;

  const partidosServiceMock = {
    crear: jest.fn(),
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    actualizar: jest.fn(),
    eliminar: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [PartidosController],
        providers: [
          {
            provide: PartidosService,
            useValue: partidosServiceMock,
          },
        ],
      }).compile();

    controller = module.get<PartidosController>(
      PartidosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});