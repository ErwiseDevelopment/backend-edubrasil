import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Aplica o RolesGuard, e especifica que apenas usuários com a role 'gestor' ou 'coordenador' podem acessar
  @UseGuards(JwtAuthGuard, RolesGuard)  // Aplica os guards de autenticação e roles
  @Roles('gestor', 'coordenador')  // Restrição de roles para 'gestor' e 'coordenador'
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Retorna os dados do usuário, incluindo as roles
  }
}
