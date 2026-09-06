import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEstadioDto } from './dto/create-estadio.dto';
import { UpdateEstadioDto } from './dto/update-estadio.dto';
import { Estadio } from './entities/estadio.entity';

@Injectable()
export class EstadiosService {
  constructor(
    @InjectRepository(Estadio)
    private readonly estadiosRepository: Repository<Estadio>,
  ) {}

  async crear(dto: CreateEstadioDto) {
    const estadio = this.estadiosRepository.create(dto);
    return this.estadiosRepository.save(estadio);
  }

  async listar() {
    return this.estadiosRepository.find();
  }

  async buscarPorId(id: number) {
    const estadio = await this.estadiosRepository.findOne({
      where: { id },
    });

    if (!estadio) {
      throw new NotFoundException(`Estadio ${id} no encontrado`);
    }

    return estadio;
  }

  async actualizar(id: number, dto: UpdateEstadioDto) {
    const estadio = await this.buscarPorId(id);

    if (dto.nombre !== undefined) {
      estadio.nombre = dto.nombre;
    }

    if (dto.ubicacion !== undefined) {
      estadio.ubicacion = dto.ubicacion;
    }

    if (dto.capacidad !== undefined) {
      estadio.capacidad = dto.capacidad;
    }

    return this.estadiosRepository.save(estadio);
  }

  async eliminar(id: number) {
    const estadio = await this.buscarPorId(id);

    await this.estadiosRepository.remove(estadio);

    return {
      message: `Estadio ${id} eliminado correctamente`,
    };
  }
}
