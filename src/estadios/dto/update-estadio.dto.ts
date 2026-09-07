import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateEstadioDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  ubicacion?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  capacidad?: number;
}
