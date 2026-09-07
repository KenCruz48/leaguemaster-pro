import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(
    private readonly categoriasService:
      CategoriasService,
  ) {}

  @Post()
  crear(
    @Body()
    createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.categoriasService.crear(
      createCategoriaDto,
    );
  }

  @Get()
  listar() {
    return this.categoriasService.listar();
  }

  @Get(':id')
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriasService.buscarPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.actualizar(
      id,
      updateCategoriaDto,
    );
  }

  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriasService.eliminar(id);
  }
}