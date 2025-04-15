import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service'; 
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
    
    if (!user) {
      return null;  // Retorna null se não encontrar o usuário
    }

    // Comparação de senha utilizando bcrypt
    const isPasswordValid = await this.usuariosService.comparePassword(senha, user.usuarios_senha);
    
    if (!isPasswordValid) {
      return null;  // Se a senha não for válida, retorna null
    }

    const { usuarios_senha, ...result } = user;  // Omitindo a senha do retorno
    return result;
  }

  // Realiza o login e gera o token JWT
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.senha);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { 
      sub: user.usuarios_id, 
      email: user.usuarios_email, 
      roles: user.usuarios_role 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
