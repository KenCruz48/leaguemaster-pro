import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  nombre!: string;

  @ManyToOne(
    () => Categoria,
    (categoria) => categoria.equipos,
    {
      nullable: false,
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn({
    name: 'categoria_id',
  })
  categoria!: Categoria;

  @RelationId(
    (equipo: Equipo) => equipo.categoria,
  )
  categoriaId!: number;
}