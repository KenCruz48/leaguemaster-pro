import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartidosModule } from './partidos/partidos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { EquiposModule } from './equipos/equipos.module';
import { JugadoresModule } from './jugadores/jugadores.module';
import { EstadiosModule } from './estadios/estadios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'mysql',

        host: configService.get<string>('DB_HOST'),

        port: Number(configService.get<string>('DB_PORT')),

        username: configService.get<string>('DB_USERNAME'),

        password: configService.get<string>('DB_PASSWORD'),

        database: configService.get<string>('DB_DATABASE'),

        autoLoadEntities: true,

        synchronize: true,
      }),
    }),

    PartidosModule,

    CategoriasModule,

    EquiposModule,

    JugadoresModule,

    EstadiosModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
