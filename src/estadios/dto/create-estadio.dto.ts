import { Trim } from '../../common/transforms/trim-string.transform';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateEstadioDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre!: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  ubicacion!: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  capacidad?: number;
}
