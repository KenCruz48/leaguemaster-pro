import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Equipo } from './entities/equipo.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equiposRepository: Repository<Equipo>,

    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  async crear(
    createEquipoDto: CreateEquipoDto,
  ): Promise<Equipo> {
    const nombre = createEquipoDto.nombre.trim();

    const equipoExistente =
      await this.equiposRepository.findOne({
        where: { nombre },
      });

    if (equipoExistente) {
      throw new ConflictException(
        `Ya existe un equipo con el nombre "${nombre}"`,
      );
    }

    const categoria =
      await this.categoriasRepository.findOne({
        where: {
          id: createEquipoDto.categoriaId,
        },
      });

    if (!categoria) {
      throw new NotFoundException(
        `No existe la categoría con ID ${createEquipoDto.categoriaId}`,
      );
    }

    const equipo =
      this.equiposRepository.create({
        nombre,
        categoria,
      });

    return this.equiposRepository.save(equipo);
  }

  async listar(): Promise<Equipo[]> {
    return this.equiposRepository.find({
      relations: {
        categoria: true,
      },
      order: {
        nombre: 'ASC',
      },
    });
  }

  async buscarPorId(id: number): Promise<Equipo> {
    const equipo =
      await this.equiposRepository.findOne({
        where: { id },
        relations: {
          categoria: true,
        },
      });

    if (!equipo) {
      throw new NotFoundException(
        `No se encontró el equipo con ID ${id}`,
      );
    }

    return equipo;
  }

  async actualizar(
    id: number,
    updateEquipoDto: UpdateEquipoDto,
  ): Promise<Equipo> {
    const equipo = await this.buscarPorId(id);

    if (updateEquipoDto.nombre !== undefined) {
      const nombre =
        updateEquipoDto.nombre.trim();

      const equipoExistente =
        await this.equiposRepository.findOne({
          where: { nombre },
        });

      if (
        equipoExistente &&
        equipoExistente.id !== equipo.id
      ) {
        throw new ConflictException(
          `Ya existe un equipo con el nombre "${nombre}"`,
        );
      }

      equipo.nombre = nombre;
    }

    if (
      updateEquipoDto.categoriaId !== undefined
    ) {
      const categoria =
        await this.categoriasRepository.findOne({
          where: {
            id: updateEquipoDto.categoriaId,
          },
        });

      if (!categoria) {
        throw new NotFoundException(
          `No existe la categoría con ID ${updateEquipoDto.categoriaId}`,
        );
      }

      equipo.categoria = categoria;
    }

    return this.equiposRepository.save(equipo);
  }

  async eliminar(
    id: number,
  ): Promise<{ message: string }> {
    const equipo = await this.buscarPorId(id);

    await this.equiposRepository.remove(equipo);

    return {
      message: `Equipo con ID ${id} eliminado correctamente`,
    };
  }
}
