import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { EstadoPartido } from '../enums/estado-partido.enum';

@Index('idx_partidos_fecha', ['fecha'])
@Index('idx_partidos_equipo_local', ['equipoLocalId'])
@Index('idx_partidos_equipo_visitante', ['equipoVisitanteId'])
@Index('idx_partidos_estadio', ['estadioId'])
@Entity('partidos')
export class Partido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'equipo_local_id', type: 'int' })
  equipoLocalId!: number;

  @Column({ name: 'equipo_visitante_id', type: 'int' })
  equipoVisitanteId!: number;

  @Column({ name: 'estadio_id', type: 'int' })
  estadioId!: number;

  @Column({ type: 'datetime' })
  fecha!: Date;

  @Column({ type: 'varchar', length: 30, default: EstadoPartido.PROGRAMADO })
  estado!: EstadoPartido;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
