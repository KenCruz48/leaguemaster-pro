import { Trim } from '../../common/transforms/trim-string.transform';
import { IsInt, IsNotEmpty, IsPositive, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateJugadorDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre!: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  apellido!: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  numeroDocumento!: string;

  @IsInt()
  @Min(1)
  @Max(99)
  numeroCamiseta!: number;

  @IsInt()
  @IsPositive()
  equipoId!: number;
}
