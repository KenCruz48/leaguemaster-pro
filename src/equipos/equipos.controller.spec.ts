import { Test, TestingModule } from '@nestjs/testing';
import { EquiposController } from './equipos.controller';
import { EquiposService } from './equipos.service';

describe('EquiposController', () => {
  let controller: EquiposController;

  const equiposServiceMock = {
    crear: jest.fn(),
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    actualizar: jest.fn(),
    eliminar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [EquiposController],
        providers: [
          {
            provide: EquiposService,
            useValue: equiposServiceMock,
          },
        ],
      }).compile();

    controller =
      module.get<EquiposController>(
        EquiposController,
      );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
