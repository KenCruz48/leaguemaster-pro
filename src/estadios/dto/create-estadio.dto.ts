import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEstadioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  ubicacion!: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  capacidad?: number;
}
