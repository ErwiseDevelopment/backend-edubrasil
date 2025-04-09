// src/escolas/dto/create-escola.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateEscolaDto {
  @IsString()
  @IsNotEmpty()
  readonly nome: string;  // Nome da escola

  @IsString()
  @IsOptional()  // Opcional, já que pode ser que a escola não tenha um endereço informado
  readonly endereco: string;  // Endereço da escola

  @IsString()
  @IsOptional()  // Opcional, pois pode ser que a escola não tenha um contato definido
  readonly contato: string;  // Contato da escola

  @IsBoolean()
  readonly status: boolean;  // Status ativo ou inativo da escola

  @IsInt()
  @IsNotEmpty()  // O ID da prefeitura é obrigatório
  readonly prefeitura_id: number;  // ID da prefeitura associada à escola
}
