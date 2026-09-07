import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Equipo } from '../equipos/entities/equipo.entity';
import { Jugador } from './entities/jugador.entity';
import { JugadoresController } from './jugadores.controller';
import { JugadoresService } from './jugadores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jugador, Equipo])],
  controllers: [JugadoresController],
  providers: [JugadoresService],
})
export class JugadoresModule {}
