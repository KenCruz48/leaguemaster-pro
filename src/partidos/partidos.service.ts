import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Equipo } from '../equipos/entities/equipo.entity';
import { Estadio } from '../estadios/entities/estadio.entity';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { Partido } from './entities/partido.entity';
import { EstadoPartido } from './enums/estado-partido.enum';

@Injectable()
export class PartidosService {
  constructor(
    @InjectRepository(Partido)
    private readonly partidosRepository: Repository<Partido>,
    @InjectRepository(Equipo)
    private readonly equiposRepository: Repository<Equipo>,
    @InjectRepository(Estadio)
    private readonly estadiosRepository: Repository<Estadio>,
  ) {}

  private validarEquipos(equipoLocalId: number, equipoVisitanteId: number): void {
    if (equipoLocalId === equipoVisitanteId) {
      throw new BadRequestException('El equipo local y el equipo visitante no pueden ser el mismo');
    }
  }

  private async validarReferencias(
    equipoLocalId: number,
    equipoVisitanteId: number,
    estadioId: number,
  ): Promise<void> {
    this.validarEquipos(equipoLocalId, equipoVisitanteId);

    const [equipoLocal, equipoVisitante, estadio] = await Promise.all([
      this.equiposRepository.findOne({ where: { id: equipoLocalId } }),
      this.equiposRepository.findOne({ where: { id: equipoVisitanteId } }),
      this.estadiosRepository.findOne({ where: { id: estadioId } }),
    ]);

    if (!equipoLocal) {
      throw new NotFoundException(`No existe el equipo local con ID ${equipoLocalId}`);
    }

    if (!equipoVisitante) {
      throw new NotFoundException(`No existe el equipo visitante con ID ${equipoVisitanteId}`);
    }

    if (!estadio) {
      throw new NotFoundException(`No existe el estadio con ID ${estadioId}`);
    }
  }

  async crear(createPartidoDto: CreatePartidoDto): Promise<Partido> {
    await this.validarReferencias(
      createPartidoDto.equipoLocalId,
      createPartidoDto.equipoVisitanteId,
      createPartidoDto.estadioId,
    );

    const partido = this.partidosRepository.create({
      equipoLocalId: createPartidoDto.equipoLocalId,
      equipoVisitanteId: createPartidoDto.equipoVisitanteId,
      estadioId: createPartidoDto.estadioId,
      fecha: new Date(createPartidoDto.fecha),
      estado: EstadoPartido.PROGRAMADO,
    });

    return this.partidosRepository.save(partido);
  }

  async listar(): Promise<Partido[]> {
    return this.partidosRepository.find({
      order: { fecha: 'ASC', id: 'ASC' },
    });
  }

  async buscarPorId(id: number): Promise<Partido> {
    const partido = await this.partidosRepository.findOne({ where: { id } });

    if (!partido) {
      throw new NotFoundException(`No se encontró el partido con ID ${id}`);
    }

    return partido;
  }

  async actualizar(id: number, updatePartidoDto: UpdatePartidoDto): Promise<Partido> {
    const partido = await this.buscarPorId(id);
    const equipoLocalId = updatePartidoDto.equipoLocalId ?? partido.equipoLocalId;
    const equipoVisitanteId = updatePartidoDto.equipoVisitanteId ?? partido.equipoVisitanteId;
    const estadioId = updatePartidoDto.estadioId ?? partido.estadioId;

    await this.validarReferencias(equipoLocalId, equipoVisitanteId, estadioId);

    if (updatePartidoDto.equipoLocalId !== undefined) {
      partido.equipoLocalId = updatePartidoDto.equipoLocalId;
    }

    if (updatePartidoDto.equipoVisitanteId !== undefined) {
      partido.equipoVisitanteId = updatePartidoDto.equipoVisitanteId;
    }

    if (updatePartidoDto.estadioId !== undefined) {
      partido.estadioId = updatePartidoDto.estadioId;
    }

    if (updatePartidoDto.fecha !== undefined) {
      partido.fecha = new Date(updatePartidoDto.fecha);
    }

    if (updatePartidoDto.estado !== undefined) {
      partido.estado = updatePartidoDto.estado;
    }

    return this.partidosRepository.save(partido);
  }

  async eliminar(id: number): Promise<{ message: string }> {
    const partido = await this.buscarPorId(id);
    await this.partidosRepository.remove(partido);

    return { message: `Partido con ID ${id} eliminado correctamente` };
  }
}
