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

  async crear(dto: CreateEstadioDto): Promise<Estadio> {
    const estadio = this.estadiosRepository.create({
      ...dto,
      nombre: dto.nombre.trim(),
      ubicacion: dto.ubicacion.trim(),
    });

    return this.estadiosRepository.save(estadio);
  }

  async listar(): Promise<Estadio[]> {
    return this.estadiosRepository.find({ order: { nombre: 'ASC', id: 'ASC' } });
  }

  async buscarPorId(id: number): Promise<Estadio> {
    const estadio = await this.estadiosRepository.findOne({ where: { id } });

    if (!estadio) {
      throw new NotFoundException(`Estadio ${id} no encontrado`);
    }

    return estadio;
  }

  async actualizar(id: number, dto: UpdateEstadioDto): Promise<Estadio> {
    const estadio = await this.buscarPorId(id);

    if (dto.nombre !== undefined) {
      estadio.nombre = dto.nombre.trim();
    }

    if (dto.ubicacion !== undefined) {
      estadio.ubicacion = dto.ubicacion.trim();
    }

    if (dto.capacidad !== undefined) {
      estadio.capacidad = dto.capacidad;
    }

    return this.estadiosRepository.save(estadio);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const estadio = await this.buscarPorId(id);
    await this.estadiosRepository.remove(estadio);

    return { message: `Estadio ${id} eliminado correctamente` };
  }
}
