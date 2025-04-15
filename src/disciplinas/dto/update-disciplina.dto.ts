// src/disciplinas/dto/update-disciplina.dto.ts
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateDisciplinaDto {
  @IsOptional()
  @IsString()
  readonly nome?: string;

  @IsOptional()
  @IsString()
  readonly descricao?: string;

  @IsOptional()
  @IsInt()
  readonly escola_id?: number;
}