// src/periodos-escolares/periodos-escolares.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { db } from '../database/drizzle.config';
import { periodos_escolares, escolas } from '../database/schema';
import { CreatePeriodoEscolarDto } from './dto/create-periodo-escolar.dto';
import { UpdatePeriodoEscolarDto } from './dto/update-periodo-escolar.dto';
import { eq, and, sql } from 'drizzle-orm';

@Injectable()
export class PeriodosEscolaresService {
  // Criar um novo período escolar
  async create(createPeriodoEscolarDto: CreatePeriodoEscolarDto) {
    const { ano, bimestre, data_inicio, data_fim, status, escola_id } = createPeriodoEscolarDto;

    // Verificar se a escola existe
    const escola = await db
      .select()
      .from(escolas)
      .where(eq(escolas.escolas_id, escola_id))
      .execute();

    if (escola.length === 0) {
      throw new NotFoundException('Escola não encontrada');
    }

    // Validar se data_fim é depois de data_inicio
    if (new Date(data_fim) <= new Date(data_inicio)) {
      throw new BadRequestException('A data de fim deve ser posterior à data de início');
    }

    // Verificar se já existe período com mesmo ano, bimestre e escola
    const periodoExistente = await db
      .select()
      .from(periodos_escolares)
      .where(
        and(
          eq(periodos_escolares.periodos_escolares_ano, ano),
          eq(periodos_escolares.periodos_escolares_bimestre, bimestre),
          eq(periodos_escolares.periodos_escolares_escola_id, escola_id)
        )
      )
      .execute();

    if (periodoExistente.length > 0) {
      throw new BadRequestException(`Já existe um período escolar para o ano ${ano}, bimestre ${bimestre} nesta escola`);
    }

    // Converter datas para o formato que o Drizzle espera (string no formato ISO)
    const dataInicioFormatada = new Date(data_inicio).toISOString();
    const dataFimFormatada = new Date(data_fim).toISOString();

    // Criar o período escolar
    const resultado = await db
      .insert(periodos_escolares)
      .values({
        periodos_escolares_escola_id: escola_id,
        periodos_escolares_ano: ano,
        periodos_escolares_bimestre: bimestre,
        periodos_escolares_data_inicio: dataInicioFormatada,
        periodos_escolares_data_fim: dataFimFormatada,
        periodos_escolares_status: status,
      })
      .returning();

    return resultado;
  }

  // Buscar todos os períodos escolares
  async findAll() {
    return await db.select().from(periodos_escolares);
  }

  // Buscar períodos escolares por escola
  async findByEscola(escolaId: number) {
    return await db
      .select()
      .from(periodos_escolares)
      .where(eq(periodos_escolares.periodos_escolares_escola_id, escolaId))
      .execute();
  }

  // Buscar um período escolar específico
  async findOne(id: number) {
    const periodo = await db
      .select()
      .from(periodos_escolares)
      .where(eq(periodos_escolares.periodos_escolares_id, id))
      .execute();

    if (periodo.length === 0) {
      throw new NotFoundException('Período escolar não encontrado');
    }

    return periodo[0];
  }

  // Atualizar um período escolar
  async update(id: number, updatePeriodoEscolarDto: UpdatePeriodoEscolarDto) {
    const { ano, bimestre, data_inicio, data_fim, status, escola_id } = updatePeriodoEscolarDto;

    // Verificar se o período existe
    await this.findOne(id);

    // Verificar se a escola existe, se fornecida
    if (escola_id) {
      const escola = await db
        .select()
        .from(escolas)
        .where(eq(escolas.escolas_id, escola_id))
        .execute();

      if (escola.length === 0) {
        throw new NotFoundException('Escola não encontrada');
      }
    }

    // Se ambas as datas forem fornecidas, validar que data_fim é posterior a data_inicio
    if (data_inicio && data_fim && new Date(data_fim) <= new Date(data_inicio)) {
      throw new BadRequestException('A data de fim deve ser posterior à data de início');
    }

    // Preparar objeto de atualização com valores fornecidos
    const updateValues: any = {};
    
    if (escola_id !== undefined) updateValues.periodos_escolares_escola_id = escola_id;
    if (ano !== undefined) updateValues.periodos_escolares_ano = ano;
    if (bimestre !== undefined) updateValues.periodos_escolares_bimestre = bimestre;
    if (status !== undefined) updateValues.periodos_escolares_status = status;
    
    // Converter datas para o formato que o Drizzle espera (string no formato ISO)
    if (data_inicio) 
      updateValues.periodos_escolares_data_inicio = new Date(data_inicio).toISOString();
    if (data_fim) 
      updateValues.periodos_escolares_data_fim = new Date(data_fim).toISOString();
    
    // Adicionar timestamp de atualização
    updateValues.periodos_escolares_updated_at = sql`CURRENT_TIMESTAMP`;

    // Atualizar o período escolar
    const resultado = await db
      .update(periodos_escolares)
      .set(updateValues)
      .where(eq(periodos_escolares.periodos_escolares_id, id))
      .returning();

    return resultado;
  }

  // Remover um período escolar
  async remove(id: number) {
    // Verificar se o período existe
    await this.findOne(id);

    return await db
      .delete(periodos_escolares)
      .where(eq(periodos_escolares.periodos_escolares_id, id))
      .execute();
  }

  // Método auxiliar para verificar se um período escolar existe
  async checkPeriodoExists(id: number): Promise<boolean> {
    try {
      await this.findOne(id);
      return true;
    } catch {
      return false;
    }
  }
}