import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Estadio } from './entities/estadio.entity';
import { EstadiosController } from './estadios.controller';
import { EstadiosService } from './estadios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estadio])],
  controllers: [EstadiosController],
  providers: [EstadiosService],
})
export class EstadiosModule {}
