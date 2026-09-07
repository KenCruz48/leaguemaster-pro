import { IsDateString, IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';

import { EstadoPartido } from '../enums/estado-partido.enum';

export class UpdatePartidoDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  equipoLocalId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  equipoVisitanteId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  estadioId?: number;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsEnum(EstadoPartido)
  estado?: EstadoPartido;
}
