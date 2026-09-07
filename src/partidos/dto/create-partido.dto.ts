import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreatePartidoDto {
  @IsInt()
  @IsPositive()
  equipoLocalId: number;

  @IsInt()
  @IsPositive()
  equipoVisitanteId: number;

  @IsInt()
  @IsPositive()
  estadioId: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: string;
}