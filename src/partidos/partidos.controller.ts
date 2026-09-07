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

import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { PartidosService } from './partidos.service';

@Controller('partidos')
export class PartidosController {
  constructor(
    private readonly partidosService: PartidosService,
  ) {}

  @Post()
  crear(
    @Body() createPartidoDto: CreatePartidoDto,
  ) {
    return this.partidosService.crear(
      createPartidoDto,
    );
  }

  @Get()
  listar() {
    return this.partidosService.listar();
  }

  @Get(':id')
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.partidosService.buscarPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePartidoDto: UpdatePartidoDto,
  ) {
    return this.partidosService.actualizar(
      id,
      updatePartidoDto,
    );
  }

  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.partidosService.eliminar(id);
  }
}