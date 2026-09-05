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

import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Controller('equipos')
export class EquiposController {
  constructor(
    private readonly equiposService:
      EquiposService,
  ) {}

  @Post()
  crear(
    @Body()
    createEquipoDto: CreateEquipoDto,
  ) {
    return this.equiposService.crear(
      createEquipoDto,
    );
  }

  @Get()
  listar() {
    return this.equiposService.listar();
  }

  @Get(':id')
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.equiposService.buscarPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateEquipoDto: UpdateEquipoDto,
  ) {
    return this.equiposService.actualizar(
      id,
      updateEquipoDto,
    );
  }

  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.equiposService.eliminar(id);
  }
}