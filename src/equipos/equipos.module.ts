import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Equipo } from './entities/equipo.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

import { EquiposController } from './equipos.controller';
import { EquiposService } from './equipos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Equipo,
      Categoria,
    ]),
  ],

  controllers: [
    EquiposController,
  ],

  providers: [
    EquiposService,
  ],

  exports: [
    TypeOrmModule,
    EquiposService,
  ],
})
export class EquiposModule {}