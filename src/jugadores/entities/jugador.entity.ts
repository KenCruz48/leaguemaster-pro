import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Equipo } from '../../equipos/entities/equipo.entity';

@Entity('jugadores')
export class Jugador {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 80,
  })
  nombre!: string;

  @Column({
    type: 'varchar',
    length: 80,
  })
  apellido!: string;

  @Column({
    name: 'numero_documento',
    type: 'varchar',
    length: 30,
    unique: true,
  })
  numeroDocumento!: string;

  @Column({
    name: 'numero_camiseta',
    type: 'int',
  })
  numeroCamiseta!: number;

  @ManyToOne(() => Equipo, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'equipo_id',
  })
  equipo!: Equipo;
}
