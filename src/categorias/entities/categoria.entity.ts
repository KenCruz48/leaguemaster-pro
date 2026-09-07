import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Equipo } from '../../equipos/entities/equipo.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 80,
    unique: true,
  })
  nombre!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  descripcion!: string | null;

  @OneToMany(
    () => Equipo,
    (equipo) => equipo.categoria,
  )
  equipos!: Equipo[];
}