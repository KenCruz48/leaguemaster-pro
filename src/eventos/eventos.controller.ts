import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';

@Controller('partidos/:partidoId/eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  crear(@Param('partidoId', ParseIntPipe) partidoId: number, @Body() dto: CreateEventoDto) {
    return this.eventosService.crear(partidoId, dto);
  }

  @Get()
  listar(@Param('partidoId', ParseIntPipe) partidoId: number) {
    return this.eventosService.listarPorPartido(partidoId);
  }
}
