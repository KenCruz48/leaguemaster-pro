import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('estadios')
export class Estadio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 120,
  })
  nombre!: string;

  @Column({
    type: 'varchar',
    length: 180,
  })
  ubicacion!: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  capacidad?: number;
}
