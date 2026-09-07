import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { EventoPartido } from './entities/evento-partido.entity';

import { Partido } from '../partidos/entities/partido.entity';
import { Jugador } from '../jugadores/entities/jugador.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventoPartido,
      Partido,
      Jugador,
    ]),
  ],
  controllers: [EventosController],
  providers: [EventosService],
})
export class EventosModule {}