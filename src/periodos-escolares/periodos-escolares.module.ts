// src/periodos-escolares/periodos-escolares.module.ts
import { Module } from '@nestjs/common';
import { PeriodosEscolaresController } from './periodos-escolares.controller';
import { PeriodosEscolaresService } from './periodos-escolares.service';

@Module({
  controllers: [PeriodosEscolaresController],
  providers: [PeriodosEscolaresService],
  exports: [PeriodosEscolaresService],
})
export class PeriodosEscolaresModule {}