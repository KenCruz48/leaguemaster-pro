import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Equipo } from '../equipos/entities/equipo.entity';
import { Estadio } from '../estadios/entities/estadio.entity';
import { Partido } from './entities/partido.entity';
import { PartidosController } from './partidos.controller';
import { PartidosService } from './partidos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Partido, Equipo, Estadio])],
  controllers: [PartidosController],
  providers: [PartidosService],
})
export class PartidosModule {}
