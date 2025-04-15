// src/turmas/turmas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../database/drizzle.config';
import { turmas, escolas } from '../database/schema';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { eq } from 'drizzle-orm';
import { PeriodosEscolaresService } from '../periodos-escolares/periodos-escolares.service';

@Injectable()
export class TurmasService {
  constructor(
    private readonly periodosEscolaresService: PeriodosEscolaresService
  ) {}

  // Criar uma nova turma
  async create(createTurmaDto: CreateTurmaDto) {
    const { nome, periodo_escolar_id, escola_id } = createTurmaDto;

    // Verificar se a escola existe
    const escola = await db
      .select()
      .from(escolas)
      .where(eq(escolas.escolas_id, escola_id))
      .execute();

    if (escola.length === 0) {
      throw new NotFoundException('Escola não encontrada');
    }

    // Verificar se o período escolar existe
    const periodoExiste = await this.periodosEscolaresService.checkPeriodoExists(periodo_escolar_id);
    if (!periodoExiste) {
      throw new NotFoundException('Período escolar não encontrado');
    }

    // Criar a turma
    const resultado = await db
      .insert(turmas)
      .values({
        turmas_nome: nome,
        turmas_periodos_escolares_id: periodo_escolar_id,
        turmas_escola_id: escola_id,
      })
      .returning();

    return resultado;
  }

  // Buscar todas as turmas
  async findAll() {
    return await db.select().from(turmas);
  }

  // Buscar uma turma específica
  async findOne(id: number) {
    const turma = await db
      .select()
      .from(turmas)
      .where(eq(turmas.turmas_id, id))
      .execute();

    if (turma.length === 0) {
      throw new NotFoundException('Turma não encontrada');
    }

    return turma[0];
  }

  // Atualizar uma turma
  async update(id: number, updateTurmaDto: UpdateTurmaDto) {
    const { nome, periodo_escolar_id, escola_id } = updateTurmaDto;

    // Verificar se a turma existe
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

    // Verificar se o período escolar existe, se fornecido
    if (periodo_escolar_id) {
      const periodoExiste = await this.periodosEscolaresService.checkPeriodoExists(periodo_escolar_id);
      if (!periodoExiste) {
        throw new NotFoundException('Período escolar não encontrado');
      }
    }

    // Atualizar a turma
    const resultado = await db
      .update(turmas)
      .set({
        turmas_nome: nome,
        turmas_periodos_escolares_id: periodo_escolar_id,
        turmas_escola_id: escola_id,
        turmas_updated_at: new Date(),
      })
      .where(eq(turmas.turmas_id, id))
      .returning();

    return resultado;
  }

  // Remover uma turma
  async remove(id: number) {
    // Verificar se a turma existe
    await this.findOne(id);

    return await db
      .delete(turmas)
      .where(eq(turmas.turmas_id, id))
      .execute();
  }
}