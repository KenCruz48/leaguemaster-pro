import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateJugadorDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  apellido?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  numeroDocumento?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(99)
  numeroCamiseta?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  equipoId?: number;
}
