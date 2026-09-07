import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Equipo } from '../equipos/entities/equipo.entity';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { Jugador } from './entities/jugador.entity';

@Injectable()
export class JugadoresService {
  constructor(
    @InjectRepository(Jugador)
    private readonly jugadoresRepository: Repository<Jugador>,
    @InjectRepository(Equipo)
    private readonly equiposRepository: Repository<Equipo>,
  ) {}

  private async buscarEquipo(equipoId: number): Promise<Equipo> {
    const equipo = await this.equiposRepository.findOne({ where: { id: equipoId } });

    if (!equipo) {
      throw new NotFoundException(`Equipo ${equipoId} no encontrado`);
    }

    return equipo;
  }

  async crear(dto: CreateJugadorDto): Promise<Jugador> {
    const numeroDocumento = dto.numeroDocumento.trim();
    const jugadorExistente = await this.jugadoresRepository.findOne({
      where: { numeroDocumento },
    });

    if (jugadorExistente) {
      throw new ConflictException('El número de documento ya está registrado');
    }

    const equipo = await this.buscarEquipo(dto.equipoId);
    const jugador = this.jugadoresRepository.create({
      nombre: dto.nombre.trim(),
      apellido: dto.apellido.trim(),
      numeroDocumento,
      numeroCamiseta: dto.numeroCamiseta,
      equipo,
    });

    return this.jugadoresRepository.save(jugador);
  }

  async listar(): Promise<Jugador[]> {
    return this.jugadoresRepository.find({
      relations: { equipo: true },
      order: { apellido: 'ASC', nombre: 'ASC', id: 'ASC' },
    });
  }

  async buscarPorId(id: number): Promise<Jugador> {
    const jugador = await this.jugadoresRepository.findOne({
      where: { id },
      relations: { equipo: true },
    });

    if (!jugador) {
      throw new NotFoundException(`Jugador ${id} no encontrado`);
    }

    return jugador;
  }

  async actualizar(id: number, dto: UpdateJugadorDto): Promise<Jugador> {
    const jugador = await this.buscarPorId(id);

    if (dto.numeroDocumento !== undefined) {
      const numeroDocumento = dto.numeroDocumento.trim();

      if (numeroDocumento !== jugador.numeroDocumento) {
        const jugadorExistente = await this.jugadoresRepository.findOne({
          where: { numeroDocumento },
        });

        if (jugadorExistente) {
          throw new ConflictException('El número de documento ya está registrado');
        }
      }

      jugador.numeroDocumento = numeroDocumento;
    }

    if (dto.equipoId !== undefined) {
      jugador.equipo = await this.buscarEquipo(dto.equipoId);
    }

    if (dto.nombre !== undefined) {
      jugador.nombre = dto.nombre.trim();
    }

    if (dto.apellido !== undefined) {
      jugador.apellido = dto.apellido.trim();
    }

    if (dto.numeroCamiseta !== undefined) {
      jugador.numeroCamiseta = dto.numeroCamiseta;
    }

    return this.jugadoresRepository.save(jugador);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const jugador = await this.buscarPorId(id);
    await this.jugadoresRepository.remove(jugador);

    return { message: `Jugador ${id} eliminado correctamente` };
  }
}
