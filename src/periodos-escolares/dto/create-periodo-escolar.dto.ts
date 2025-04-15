// src/periodos-escolares/dto/create-periodo-escolar.dto.ts
import { IsInt, IsNotEmpty, IsDate, IsBoolean, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePeriodoEscolarDto {
  @IsInt()
  @IsNotEmpty()
  readonly escola_id: number; // Adicionar este campo

  @IsInt()
  @IsNotEmpty()
  @Min(2000)
  @Max(2100)
  readonly ano: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(4)
  readonly bimestre: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly data_inicio: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly data_fim: Date;

  @IsBoolean()
  readonly status: boolean = true;
}