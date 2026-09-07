import { Trim } from '../../common/transforms/trim-string.transform';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdateEquipoDto {
  @IsOptional()
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  categoriaId?: number;
}
