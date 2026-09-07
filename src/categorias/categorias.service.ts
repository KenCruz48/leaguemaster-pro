import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  async crear(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<Categoria> {
    const nombre = createCategoriaDto.nombre.trim();

    const existente =
      await this.categoriasRepository.findOne({
        where: { nombre },
      });

    if (existente) {
      throw new ConflictException(
        `Ya existe una categoría con el nombre "${nombre}"`,
      );
    }

    const categoria =
      this.categoriasRepository.create({
        nombre,
        descripcion:
          createCategoriaDto.descripcion?.trim() ?? null,
      });

    return this.categoriasRepository.save(categoria);
  }

  async listar(): Promise<Categoria[]> {
    return this.categoriasRepository.find({
      order: {
        nombre: 'ASC',
      },
    });
  }

  async buscarPorId(id: number): Promise<Categoria> {
    const categoria =
      await this.categoriasRepository.findOne({
        where: { id },
      });

    if (!categoria) {
      throw new NotFoundException(
        `No se encontró la categoría con ID ${id}`,
      );
    }

    return categoria;
  }

  async actualizar(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.buscarPorId(id);

    if (updateCategoriaDto.nombre !== undefined) {
      const nombre =
        updateCategoriaDto.nombre.trim();

      const existente =
        await this.categoriasRepository.findOne({
          where: { nombre },
        });

      if (
        existente &&
        existente.id !== categoria.id
      ) {
        throw new ConflictException(
          `Ya existe una categoría con el nombre "${nombre}"`,
        );
      }

      categoria.nombre = nombre;
    }

    if (
      updateCategoriaDto.descripcion !== undefined
    ) {
      categoria.descripcion =
        updateCategoriaDto.descripcion.trim();
    }

    return this.categoriasRepository.save(categoria);
  }

  async eliminar(
    id: number,
  ): Promise<{ message: string }> {
    const categoria = await this.buscarPorId(id);

    await this.categoriasRepository.remove(
      categoria,
    );

    return {
      message: `Categoría con ID ${id} eliminada correctamente`,
    };
  }
}
