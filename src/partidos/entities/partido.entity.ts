import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('partidos')
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'equipo_local_id', type: 'int' })
  equipoLocalId: number;

  @Column({ name: 'equipo_visitante_id', type: 'int' })
  equipoVisitanteId: number;

  @Column({ name: 'estadio_id', type: 'int' })
  estadioId: number;

  @Column({ type: 'datetime' })
  fecha: Date;

  @Column({
    type: 'varchar',
    length: 30,
    default: 'PROGRAMADO',
  })
  estado: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}