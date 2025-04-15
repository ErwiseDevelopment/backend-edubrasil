// src/turmas/dto/create-turma.dto.ts
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTurmaDto {
  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsInt()
  @IsNotEmpty()
  readonly periodo_escolar_id: number;

  @IsInt()
  @IsNotEmpty()
  readonly escola_id: number;
}