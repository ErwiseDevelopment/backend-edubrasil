// src/usuarios/usuarios.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)  // Protege todas as rotas do módulo de usuários
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Rota para criar um novo usuário
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuariosService.create(createUsuarioDto);
  }

  // Rota para listar todos os usuários
  @Get()
  async findAll() {
    return await this.usuariosService.findAll();
  }

  // Rota para encontrar um usuário pelo ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usuariosService.findOne(id);
  }

  // Rota para atualizar os dados de um usuário
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuariosService.update(id, updateUsuarioDto);
  }

  // Rota para remover um usuário
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.usuariosService.remove(id);
  }
}
