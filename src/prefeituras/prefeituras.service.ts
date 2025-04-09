// src/prefeituras/prefeituras.service.ts
import { Injectable } from '@nestjs/common';
import { db } from '../database/drizzle.config';
import { prefeituras } from '../database/schema';
import { CreatePrefeituraDto } from './dto/create-prefeitura.dto';
import { UpdatePrefeituraDto } from './dto/update-prefeitura.dto';
import { eq } from 'drizzle-orm'; // Importa a função eq para comparação

@Injectable()
export class PrefeiturasService {
  // Cria uma nova prefeitura usando os dados do DTO
  async create(dto: CreatePrefeituraDto) {
    const result = await db
      .insert(prefeituras)
      .values({
        prefeituras_nome: dto.nome,
        prefeituras_endereco: dto.endereco,
        prefeituras_contato: dto.contato,
      })
      .returning();
    return result;
  }

  // Retorna todas as prefeituras do banco de dados
  async findAll() {
    return await db.select().from(prefeituras);
  }

  // Retorna uma prefeitura específica filtrada pelo ID utilizando eq para comparação
  async findOne(id: number) {
    return await db.select().from(prefeituras).where(eq(prefeituras.prefeituras_id, id));
  }

  // Atualiza uma prefeitura com base no ID e nos dados enviados
  async update(id: number, dto: UpdatePrefeituraDto) {
    const result = await db
      .update(prefeituras)
      .set({
        prefeituras_nome: dto.nome,
        prefeituras_endereco: dto.endereco,
        prefeituras_contato: dto.contato,
        prefeituras_status: dto.status,
        prefeituras_updated_at: new Date(), // Atualiza o timestamp de modificação
      })
      .where(eq(prefeituras.prefeituras_id, id))
      .returning();
    return result;
  }

  // Remove uma prefeitura baseada no ID
  async remove(id: number) {
    return await db.delete(prefeituras).where(eq(prefeituras.prefeituras_id, id));
  }
}
