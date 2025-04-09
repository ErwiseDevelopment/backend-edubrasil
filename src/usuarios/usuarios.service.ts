// src/usuarios/usuarios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../database/drizzle.config';
import { usuarios, escolas } from '../database/schema';  // Importando a tabela de escolas para verificar a existência de uma escola
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { eq } from 'drizzle-orm'; // A importação do eq corretamente

@Injectable()
export class UsuariosService {
  // Função para criar um novo usuário
  async create(dto: CreateUsuarioDto) {
    const { nome, email, senha, role, escola_id } = dto;

    // Verificação se a escola existe antes de criar o usuário
    if (escola_id) {
      const escola = await db
        .select()
        .from(escolas)
        .where(eq(escolas.escolas_id, escola_id)) // Verifica se a escola existe no banco
        .limit(1)
        .execute();

      if (escola.length === 0) {
        throw new NotFoundException('Escola não encontrada!');
      }
    }

    // Criação do usuário no banco de dados
    const result = await db
      .insert(usuarios)
      .values({
        usuarios_nome: nome,
        usuarios_email: email,
        usuarios_senha: senha, // Em um cenário real, a senha deve ser hashada
        usuarios_role: role,
        usuarios_escola_id: escola_id,
      })
      .returning();  // Retorna o usuário recém-criado
    return result;
  }

  // Função para retornar todos os usuários
  async findAll() {
    return await db.select().from(usuarios);
  }

  // Função para retornar um usuário pelo ID
  async findOne(id: number) {
    const user = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.usuarios_id, id))  // A comparação usando 'eq' está correta
      .execute(); // 'execute' é necessário no Drizzle ORM para executar a consulta
    if (user.length === 0) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user[0];
  }

  // Função para buscar um usuário pelo e-mail (útil para autenticação)
  async findByEmail(email: string) {
    const user = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.usuarios_email, email))
      .execute();  // 'execute' é necessário aqui também
    return user.length > 0 ? user[0] : null;  // Se não encontrar, retorna null
  }

  // Função para atualizar um usuário
  async update(id: number, dto: UpdateUsuarioDto) {
    const result = await db
      .update(usuarios)
      .set({
        usuarios_nome: dto.nome,
        usuarios_email: dto.email,
        usuarios_senha: dto.senha,
        usuarios_role: dto.role,
        usuarios_escola_id: dto.escola_id,
        usuarios_status: dto.status,
        usuarios_updated_at: new Date(),
      })
      .where(eq(usuarios.usuarios_id, id))  // A comparação de ID utilizando 'eq'
      .returning();  // Retorna os dados do usuário atualizado
    return result;
  }

  // Função para remover um usuário
  async remove(id: number) {
    return await db
      .delete(usuarios)
      .where(eq(usuarios.usuarios_id, id))  // A comparação de ID utilizando 'eq'
      .execute();  // O 'execute' é necessário para deletar o usuário
  }
}
