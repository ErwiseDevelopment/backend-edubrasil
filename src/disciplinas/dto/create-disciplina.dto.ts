// src/disciplinas/dto/create-disciplina.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateDisciplinaDto {
  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsString()
  @IsOptional()
  readonly descricao?: string;

  @IsInt()
  @IsNotEmpty()
  readonly escola_id: number;
}