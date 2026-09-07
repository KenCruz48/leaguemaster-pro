import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Jugador } from '../jugadores/entities/jugador.entity';
import { Partido } from '../partidos/entities/partido.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { EventoPartido } from './entities/evento-partido.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(EventoPartido)
    private readonly eventosRepository: Repository<EventoPartido>,
    @InjectRepository(Partido)
    private readonly partidosRepository: Repository<Partido>,
    @InjectRepository(Jugador)
    private readonly jugadoresRepository: Repository<Jugador>,
  ) {}

  async crear(partidoId: number, dto: CreateEventoDto): Promise<EventoPartido> {
    const partido = await this.partidosRepository.findOne({ where: { id: partidoId } });

    if (!partido) {
      throw new NotFoundException(`Partido ${partidoId} no encontrado`);
    }

    const jugador = await this.jugadoresRepository.findOne({
      where: { id: dto.jugadorId },
      relations: { equipo: true },
    });

    if (!jugador) {
      throw new NotFoundException(`Jugador ${dto.jugadorId} no encontrado`);
    }

    const pertenece =
      jugador.equipo.id === partido.equipoLocalId ||
      jugador.equipo.id === partido.equipoVisitanteId;

    if (!pertenece) {
      throw new BadRequestException('El jugador no pertenece a ninguno de los equipos del partido');
    }

    const evento = this.eventosRepository.create({
      tipo: dto.tipo,
      minuto: dto.minuto,
      partido,
      jugador,
    });

    return this.eventosRepository.save(evento);
  }

  async listarPorPartido(partidoId: number): Promise<EventoPartido[]> {
    const partido = await this.partidosRepository.findOne({ where: { id: partidoId } });

    if (!partido) {
      throw new NotFoundException(`Partido ${partidoId} no encontrado`);
    }

    return this.eventosRepository.find({
      where: { partido: { id: partidoId } },
      relations: { jugador: true, partido: true },
      order: { minuto: 'ASC', id: 'ASC' },
    });
  }
}
