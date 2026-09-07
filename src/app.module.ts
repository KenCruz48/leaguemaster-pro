import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './categorias/categorias.module';
import { EquiposModule } from './equipos/equipos.module';
import { EstadiosModule } from './estadios/estadios.module';
import { EventosModule } from './eventos/eventos.module';
import { JugadoresModule } from './jugadores/jugadores.module';
import { PartidosModule } from './partidos/partidos.module';
import { validateEnvironment } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnvironment,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow<boolean>('DB_SYNCHRONIZE'),
        retryAttempts: 3,
        retryDelay: 2000,
        extra: {
          connectionLimit: 10,
        },
      }),
    }),
    CategoriasModule,
    EquiposModule,
    JugadoresModule,
    EstadiosModule,
    PartidosModule,
    EventosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
