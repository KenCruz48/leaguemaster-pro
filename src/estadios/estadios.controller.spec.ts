import { Test, TestingModule } from '@nestjs/testing';

import { EstadiosController } from './estadios.controller';
import { EstadiosService } from './estadios.service';

describe('EstadiosController', () => {
  let controller: EstadiosController;

  const estadiosServiceMock = {
    crear: jest.fn(),
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    actualizar: jest.fn(),
    eliminar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadiosController],
      providers: [
        {
          provide: EstadiosService,
          useValue: estadiosServiceMock,
        },
      ],
    }).compile();

    controller = module.get<EstadiosController>(EstadiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
