// src/disciplinas/disciplinas.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { db } from '../database/drizzle.config';
import { disciplinas, escolas, prefeituras } from '../database/schema';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class DisciplinasService {
  // Criar uma nova disciplina
  async create(createDisciplinaDto: CreateDisciplinaDto) {
    const { nome, descricao, escola_id } = createDisciplinaDto;

    // Verificar se a escola existe
    const escola = await db
      .select({
        id: escolas.escolas_id,
        prefeitura_id: escolas.escolas_prefeitura_id
      })
      .from(escolas)
      .where(eq(escolas.escolas_id, escola_id))
      .execute();

    if (escola.length === 0) {
      throw new NotFoundException('Escola não encontrada');
    }

    // Criar a disciplina
    const resultado = await db
      .insert(disciplinas)
      .values({
        disciplinas_nome: nome,
        disciplinas_descricao: descricao,
        disciplinas_escola_id: escola_id,
      })
      .returning();

    return resultado;
  }

  // Buscar todas as disciplinas
  async findAll() {
    return await db.select().from(disciplinas);
  }

  // Buscar disciplinas por escola
  async findByEscola(escolaId: number) {
    return await db
      .select()
      .from(disciplinas)
      .where(eq(disciplinas.disciplinas_escola_id, escolaId))
      .execute();
  }

  // Buscar disciplinas por prefeitura (todas as escolas da prefeitura)
  async findByPrefeitura(prefeituraId: number) {
    // Primeiro, encontrar todas as escolas da prefeitura
    const escolasDaPrefeitura = await db
      .select({
        id: escolas.escolas_id
      })
      .from(escolas)
      .where(eq(escolas.escolas_prefeitura_id, prefeituraId))
      .execute();
  
    if (escolasDaPrefeitura.length === 0) {
      return [];
    }
  
    // Obter as IDs das escolas
    const escolasIds = escolasDaPrefeitura.map(escola => escola.id);
    
    // Alternativa 1: Usar uma abordagem de queries separadas, com tipagem explícita
    type DisciplinaRecord = typeof disciplinas.$inferSelect;
    const todasDisciplinas: DisciplinaRecord[] = [];
    
    for (const escolaId of escolasIds) {
      const disciplinasDaEscola = await this.findByEscola(escolaId);
      todasDisciplinas.push(...disciplinasDaEscola);
    }
    
    return todasDisciplinas;
}

  // Buscar uma disciplina específica
  async findOne(id: number) {
    const disciplina = await db
      .select()
      .from(disciplinas)
      .where(eq(disciplinas.disciplinas_id, id))
      .execute();

    if (disciplina.length === 0) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    return disciplina[0];
  }

  // Atualizar uma disciplina
  async update(id: number, updateDisciplinaDto: UpdateDisciplinaDto) {
    const { nome, descricao, escola_id } = updateDisciplinaDto;

    // Verificar se a disciplina existe
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

    // Atualizar a disciplina
    const resultado = await db
      .update(disciplinas)
      .set({
        disciplinas_nome: nome,
        disciplinas_descricao: descricao,
        disciplinas_escola_id: escola_id,
        disciplinas_updated_at: new Date(),
      })
      .where(eq(disciplinas.disciplinas_id, id))
      .returning();

    return resultado;
  }

  // Remover uma disciplina
  async remove(id: number) {
    // Verificar se a disciplina existe
    await this.findOne(id);

    return await db
      .delete(disciplinas)
      .where(eq(disciplinas.disciplinas_id, id))
      .execute();
  }
}