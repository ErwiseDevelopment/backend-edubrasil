import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { db } from '../database/drizzle.config';
import { usuarios, escolas } from '../database/schema'; 
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { eq } from 'drizzle-orm'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  // Função para criar um novo usuário
  async create(dto: CreateUsuarioDto) {
    const { nome, email, senha, role, escola_id } = dto;

    // Verificação se o email já existe
    const existingUser = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.usuarios_email, email))  // Verifica se já existe um usuário com esse email
      .execute();

    if (existingUser.length > 0) {
      // Se o usuário com o mesmo email já existir, lança um erro de conflito (409)
      throw new ConflictException('Email já está em uso!');
    }

    // Verificação se a escola existe antes de criar o usuário
    if (escola_id) {
      const escola = await db
        .select()
        .from(escolas)
        .where(eq(escolas.escolas_id, escola_id)) 
        .limit(1)
        .execute();

      if (escola.length === 0) {
        throw new NotFoundException('Escola não encontrada!');
      }
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);  // 10 é o número de rounds de hash

    // Criação do usuário no banco de dados
    const result = await db
      .insert(usuarios)
      .values({
        usuarios_nome: nome,
        usuarios_email: email,
        usuarios_senha: hashedPassword,  // Armazenando a senha hashada
        usuarios_role: Array.isArray(role) ? role : [role],  // Garantindo que role seja um array
        usuarios_escola_id: escola_id,
      })
      .returning();  

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
      .where(eq(usuarios.usuarios_id, id))  
      .execute(); 
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
      .execute();  
    return user.length > 0 ? user[0] : null;  
  }

  // Função para atualizar um usuário
  async update(id: number, dto: UpdateUsuarioDto) {
    const { nome, email, senha, role, escola_id, status } = dto;

    // Hash da senha se fornecida
    const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;

    const result = await db
      .update(usuarios)
      .set({
        usuarios_nome: nome,
        usuarios_email: email,
        usuarios_senha: hashedPassword || undefined,  // Atualiza apenas se senha for fornecida
        usuarios_role: Array.isArray(role) ? role : [role],
        usuarios_escola_id: escola_id,
        usuarios_status: status,
        usuarios_updated_at: new Date(),
      })
      .where(eq(usuarios.usuarios_id, id))  
      .returning();  

    return result;
  }

  // Função para remover um usuário
  async remove(id: number) {
    return await db
      .delete(usuarios)
      .where(eq(usuarios.usuarios_id, id))  
      .execute();  
  }

  // Função para comparar a senha durante o login
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);  // Comparando a senha com o hash armazenado
  }
}
