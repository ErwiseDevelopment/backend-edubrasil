// src/turmas/turmas.module.ts
import { Module } from '@nestjs/common';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';
import { PeriodosEscolaresModule } from '../periodos-escolares/periodos-escolares.module';

@Module({
  imports: [PeriodosEscolaresModule],
  controllers: [TurmasController],
  providers: [TurmasService],
  exports: [TurmasService],
})
export class TurmasModule {}