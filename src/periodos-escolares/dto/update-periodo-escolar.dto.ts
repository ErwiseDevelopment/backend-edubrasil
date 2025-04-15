// src/periodos-escolares/dto/update-periodo-escolar.dto.ts
import { IsOptional, IsInt, IsDate, IsBoolean, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePeriodoEscolarDto {
  @IsOptional()
  @IsInt()
  readonly escola_id?: number; // Adicionar este campo

  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(2100)
  readonly ano?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  readonly bimestre?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly data_inicio?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly data_fim?: Date;

  @IsOptional()
  @IsBoolean()
  readonly status?: boolean;
}