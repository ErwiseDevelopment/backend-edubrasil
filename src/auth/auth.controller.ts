import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';  // Certifique-se de que não está sendo usado aqui na rota de login
import { RolesGuard } from './roles.guard';  // Também não deve ser usado aqui

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Rota de login (não deve ter JwtAuthGuard aqui)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);  // Rota de login não precisa de autenticação
  }

  // Rota protegida por autenticação
  @UseGuards(JwtAuthGuard)  // Somente rotas após login precisam do guard de autenticação
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;  // Retorna os dados do usuário
  }
}
