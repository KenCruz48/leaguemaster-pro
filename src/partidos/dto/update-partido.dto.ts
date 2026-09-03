import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';

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
  @IsIn([
    'PROGRAMADO',
    'EN_CURSO',
    'FINALIZADO',
    'CANCELADO',
  ])
  estado?: string;
}