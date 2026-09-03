import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { Partido } from './entities/partido.entity';

@Injectable()
export class PartidosService {
  constructor(
    @InjectRepository(Partido)
    private readonly partidosRepository: Repository<Partido>,
  ) {}

  private validarEquipos(
    equipoLocalId: number,
    equipoVisitanteId: number,
  ): void {
    if (equipoLocalId === equipoVisitanteId) {
      throw new BadRequestException(
        'El equipo local y el equipo visitante no pueden ser el mismo',
      );
    }
  }

  async crear(createPartidoDto: CreatePartidoDto): Promise<Partido> {
    this.validarEquipos(
      createPartidoDto.equipoLocalId,
      createPartidoDto.equipoVisitanteId,
    );

    const partido = this.partidosRepository.create({
      equipoLocalId: createPartidoDto.equipoLocalId,
      equipoVisitanteId: createPartidoDto.equipoVisitanteId,
      estadioId: createPartidoDto.estadioId,
      fecha: new Date(createPartidoDto.fecha),
      estado: 'PROGRAMADO',
    });

    return this.partidosRepository.save(partido);
  }

  async listar(): Promise<Partido[]> {
    return this.partidosRepository.find({
      order: {
        fecha: 'ASC',
      },
    });
  }

  async buscarPorId(id: number): Promise<Partido> {
    const partido = await this.partidosRepository.findOne({
      where: { id },
    });

    if (!partido) {
      throw new NotFoundException(
        `No se encontró el partido con ID ${id}`,
      );
    }

    return partido;
  }

  async actualizar(
    id: number,
    updatePartidoDto: UpdatePartidoDto,
  ): Promise<Partido> {
    const partido = await this.buscarPorId(id);

    const equipoLocalId =
      updatePartidoDto.equipoLocalId ??
      partido.equipoLocalId;

    const equipoVisitanteId =
      updatePartidoDto.equipoVisitanteId ??
      partido.equipoVisitanteId;

    this.validarEquipos(
      equipoLocalId,
      equipoVisitanteId,
    );

    if (updatePartidoDto.equipoLocalId !== undefined) {
      partido.equipoLocalId =
        updatePartidoDto.equipoLocalId;
    }

    if (updatePartidoDto.equipoVisitanteId !== undefined) {
      partido.equipoVisitanteId =
        updatePartidoDto.equipoVisitanteId;
    }

    if (updatePartidoDto.estadioId !== undefined) {
      partido.estadioId =
        updatePartidoDto.estadioId;
    }

    if (updatePartidoDto.fecha !== undefined) {
      partido.fecha =
        new Date(updatePartidoDto.fecha);
    }

    if (updatePartidoDto.estado !== undefined) {
      partido.estado =
        updatePartidoDto.estado;
    }

    return this.partidosRepository.save(partido);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const partido = await this.buscarPorId(id);

    await this.partidosRepository.remove(partido);

    return {
      message: `Partido con ID ${id} eliminado correctamente`,
    };
  }
}