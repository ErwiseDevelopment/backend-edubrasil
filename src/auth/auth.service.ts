// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service'; // Serviço de usuários para buscar o usuário
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida as credenciais do usuário
  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usuariosService.findByEmail(email);
    // Aqui, em um cenário real, você deve comparar a senha usando bcrypt.compare
    if (user && user.usuarios_senha === senha) {
      // Retorne os dados do usuário (omitindo a senha, por exemplo)
      const { usuarios_senha, ...result } = user;
      return result;
    }
    return null;
  }

  // Realiza o login e gera o token JWT
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.senha);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // Cria o payload com os dados que deseja incluir no token (por exemplo, id, email, role)
    const payload = { sub: user.usuarios_id, email: user.usuarios_email, role: user.usuarios_role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
