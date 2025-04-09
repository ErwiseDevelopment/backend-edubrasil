// src/escolas/dto/update-escola.dto.ts
import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class UpdateEscolaDto {
  @IsOptional()
  @IsString()
  readonly nome?: string;

  @IsOptional()
  @IsString()
  readonly endereco?: string;

  @IsOptional()
  @IsString()
  readonly contato?: string;

  @IsOptional()
  @IsBoolean()
  readonly status?: boolean;

  @IsOptional()
  @IsNumber()
  readonly prefeitura_id?: number;
}
