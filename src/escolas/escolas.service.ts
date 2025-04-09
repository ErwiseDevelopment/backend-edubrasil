import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../database/drizzle.config';  // Importa a instância do banco
import { escolas, prefeituras } from '../database/schema';  // Importa as tabelas de escolas e prefeituras
import { CreateEscolaDto } from './dto/create-escola.dto';  // Importa o DTO de criação
import { UpdateEscolaDto } from './dto/update-escola.dto';  // Importa o DTO de atualização
import { eq } from 'drizzle-orm'; // Importando eq para comparações

@Injectable()
export class EscolasService {
  // Função para criar uma nova escola
  async create(createEscolaDto: CreateEscolaDto) {
    const { nome, endereco, contato, status, prefeitura_id } = createEscolaDto;

    // Verificando se a prefeitura existe (garante que prefeitura_id não seja undefined)
    if (!prefeitura_id) {
      throw new NotFoundException('Prefeitura não fornecida');
    }

    const prefeitura = await db
      .select()
      .from(prefeituras)
      .where(eq(prefeituras.prefeituras_id, prefeitura_id)) // Verifica a existência da prefeitura
      .execute();

    if (prefeitura.length === 0) {
      throw new NotFoundException('Prefeitura não encontrada');
    }

    // Criação da escola no banco
    const escola = await db
      .insert(escolas)
      .values({
        escolas_nome: nome,
        escolas_endereco: endereco,
        escolas_contato: contato,
        escolas_status: status,
        escolas_prefeitura_id: prefeitura_id,
      })
      .returning(); // Retorna os dados inseridos

    return escola;
  }

  // Função para buscar todas as escolas
  async findAll() {
    return await db.select().from(escolas);
  }

  // Função para buscar uma escola por ID
  async findOne(id: number) {
    const escola = await db
      .select()
      .from(escolas)
      .where(eq(escolas.escolas_id, id)) // Usando 'eq' para comparar a coluna com o ID
      .execute();

    if (escola.length === 0) {
      throw new NotFoundException('Escola não encontrada');
    }

    return escola[0]; // Retorna a escola encontrada
  }

  // Função para atualizar uma escola
  async update(id: number, updateEscolaDto: UpdateEscolaDto) {
    const { nome, endereco, contato, status, prefeitura_id } = updateEscolaDto;

    // Verificando se a prefeitura existe antes de atualizar
    if (prefeitura_id) {
      const prefeitura = await db
        .select()
        .from(prefeituras)
        .where(eq(prefeituras.prefeituras_id, prefeitura_id))
        .execute();

      if (prefeitura.length === 0) {
        throw new NotFoundException('Prefeitura não encontrada');
      }
    }

    // Atualizando a escola no banco de dados
    const escolaAtualizada = await db
      .update(escolas)
      .set({
        escolas_nome: nome,
        escolas_endereco: endereco,
        escolas_contato: contato,
        escolas_status: status,
        escolas_prefeitura_id: prefeitura_id,
      })
      .where(eq(escolas.escolas_id, id)) // Atualizando com base no ID
      .returning();

    return escolaAtualizada;
  }

  // Função para deletar uma escola
  async remove(id: number) {
    const escola = await db
      .select()
      .from(escolas)
      .where(eq(escolas.escolas_id, id))
      .execute();

    if (escola.length === 0) {
      throw new NotFoundException('Escola não encontrada');
    }

    // Deletando a escola no banco de dados
    return await db.delete(escolas).where(eq(escolas.escolas_id, id));
  }
}
