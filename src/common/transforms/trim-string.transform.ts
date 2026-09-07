import { Transform, type TransformFnParams } from 'class-transformer';

function trimString({ value }: TransformFnParams): unknown {
  return typeof value === 'string' ? value.trim() : (value as unknown);
}

export function Trim(): PropertyDecorator {
  return Transform(trimString);
}
