import { IsEnum, IsInt, IsPositive, Max, Min } from 'class-validator';
import { TipoEvento } from '../enums/tipo-evento.enum';

export class CreateEventoDto {
  @IsEnum(TipoEvento)
  tipo!: TipoEvento;

  @IsInt()
  @Min(0)
  @Max(130)
  minuto!: number;

  @IsInt()
  @IsPositive()
  jugadorId!: number;
}