// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service'; // Serviço de usuários para buscar o usuário
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; // Para comparar a senha com a versão hashada

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida as credenciais do usuário
  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usuariosService.findByEmail(email); // Busca o usuário pelo e-mail
    
    if (!user) {
      return null;  // Retorna null se o usuário não for encontrado
    }

    // Compara a senha fornecida com a senha hashada no banco de dados
    const isPasswordValid = await bcrypt.compare(senha, user.usuarios_senha);
    if (!isPasswordValid) {
      return null;  // Se a senha for inválida, retorna null
    }

    // Remove a senha dos dados retornados
    const { usuarios_senha, ...result } = user;
    return result;  // Retorna o usuário sem a senha
  }

  // Realiza o login e gera o token JWT
  // src/auth/auth.service.ts
async login(loginDto: LoginDto) {
  //console.log('[login] Tentando fazer login com email:', loginDto.email);
  
  const user = await this.validateUser(loginDto.email, loginDto.senha);
  if (!user) {
    //console.log('[login] Login falhou: credenciais inválidas');
    throw new UnauthorizedException('Credenciais inválidas');
  }
  
//  console.log('[login] Usuário validado com sucesso:', user);

  const payload = { 
    sub: user.usuarios_id, 
    email: user.usuarios_email, 
    roles: user.usuarios_role 
  };

  //console.log('[login] Payload do JWT:', JSON.stringify(payload));

  const token = this.jwtService.sign(payload);

  //console.log('[login] Token JWT gerado:', token.substring(0, 20) + '...');

  return {
    access_token: token,
    user: {
      id: user.usuarios_id,
      email: user.usuarios_email,
      nome: user.usuarios_nome,
      roles: user.usuarios_role
    }
  };
}

}
