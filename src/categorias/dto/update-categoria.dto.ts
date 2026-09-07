import { Trim } from '../../common/transforms/trim-string.transform';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoriaDto {
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
  @MaxLength(255)
  descripcion?: string | null;
}
