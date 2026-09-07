import { Trim } from '../../common/transforms/trim-string.transform';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateJugadorDto {
  @IsOptional()
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre?: string;

  @IsOptional()
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  apellido?: string;

  @IsOptional()
  @Trim()
  @IsString()
  @IsNotEmpty()
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
