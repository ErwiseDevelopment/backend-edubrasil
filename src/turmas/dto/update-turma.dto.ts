// src/turmas/dto/update-turma.dto.ts
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateTurmaDto {
  @IsOptional()
  @IsString()
  readonly nome?: string;

  @IsOptional()
  @IsInt()
  readonly periodo_escolar_id?: number;

  @IsOptional()
  @IsInt()
  readonly escola_id?: number;
}