import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Partido } from '../../partidos/entities/partido.entity';
import { Jugador } from '../../jugadores/entities/jugador.entity';
import { TipoEvento } from '../enums/tipo-evento.enum';

@Entity('eventos_partido')
export class EventoPartido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: TipoEvento })
  tipo!: TipoEvento;

  @Column({ type: 'int' })
  minuto!: number;

  @ManyToOne(() => Partido, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partido_id' })
  partido!: Partido;

  @ManyToOne(() => Jugador, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'jugador_id' })
  jugador!: Jugador;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}