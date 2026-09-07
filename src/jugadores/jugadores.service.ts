import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async crear(dto: CreateJugadorDto) {
    const jugadorExistente = await this.jugadoresRepository.findOne({
      where: {
        numeroDocumento: dto.numeroDocumento,
      },
    });

    if (jugadorExistente) {
      throw new ConflictException('El número de documento ya está registrado');
    }

    const equipo = await this.equiposRepository.findOne({
      where: { id: dto.equipoId },
    });

    if (!equipo) {
      throw new NotFoundException(`Equipo ${dto.equipoId} no encontrado`);
    }

    const jugador = this.jugadoresRepository.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      numeroDocumento: dto.numeroDocumento,
      numeroCamiseta: dto.numeroCamiseta,
      equipo,
    });

    return this.jugadoresRepository.save(jugador);
  }

  async listar() {
    return this.jugadoresRepository.find({
      relations: {
        equipo: true,
      },
    });
  }

  async buscarPorId(id: number) {
    const jugador = await this.jugadoresRepository.findOne({
      where: { id },
      relations: {
        equipo: true,
      },
    });

    if (!jugador) {
      throw new NotFoundException(`Jugador ${id} no encontrado`);
    }

    return jugador;
  }

  async actualizar(id: number, dto: UpdateJugadorDto) {
    const jugador = await this.buscarPorId(id);

    if (
      dto.numeroDocumento !== undefined &&
      dto.numeroDocumento !== jugador.numeroDocumento
    ) {
      const jugadorExistente = await this.jugadoresRepository.findOne({
        where: {
          numeroDocumento: dto.numeroDocumento,
        },
      });

      if (jugadorExistente) {
        throw new ConflictException(
          'El número de documento ya está registrado',
        );
      }
    }

    if (dto.equipoId !== undefined) {
      const equipo = await this.equiposRepository.findOne({
        where: { id: dto.equipoId },
      });

      if (!equipo) {
        throw new NotFoundException(`Equipo ${dto.equipoId} no encontrado`);
      }

      jugador.equipo = equipo;
    }

    if (dto.nombre !== undefined) {
      jugador.nombre = dto.nombre;
    }

    if (dto.apellido !== undefined) {
      jugador.apellido = dto.apellido;
    }

    if (dto.numeroDocumento !== undefined) {
      jugador.numeroDocumento = dto.numeroDocumento;
    }

    if (dto.numeroCamiseta !== undefined) {
      jugador.numeroCamiseta = dto.numeroCamiseta;
    }

    return this.jugadoresRepository.save(jugador);
  }

  async eliminar(id: number) {
    const jugador = await this.buscarPorId(id);

    await this.jugadoresRepository.remove(jugador);

    return {
      message: `Jugador ${id} eliminado correctamente`,
    };
  }
}
