// src/escolas/escolas.module.ts
import { Module } from '@nestjs/common';
import { EscolasController } from './escolas.controller';
import { EscolasService } from './escolas.service';

@Module({
  controllers: [EscolasController],  // Controladores que lidam com as rotas
  providers: [EscolasService],      // Serviços que executam a lógica de negócios
})
export class EscolasModule {}
