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

import { CreateEstadioDto } from './dto/create-estadio.dto';
import { UpdateEstadioDto } from './dto/update-estadio.dto';
import { EstadiosService } from './estadios.service';

@Controller('estadios')
export class EstadiosController {
  constructor(private readonly estadiosService: EstadiosService) {}

  @Post()
  crear(@Body() dto: CreateEstadioDto) {
    return this.estadiosService.crear(dto);
  }

  @Get()
  listar() {
    return this.estadiosService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.estadiosService.buscarPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstadioDto,
  ) {
    return this.estadiosService.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.estadiosService.eliminar(id);
  }
}
