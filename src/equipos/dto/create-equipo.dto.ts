import { Trim } from '../../common/transforms/trim-string.transform';
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateEquipoDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @IsInt()
  @IsPositive()
  categoriaId!: number;
}
