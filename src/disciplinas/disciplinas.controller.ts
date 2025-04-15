// src/disciplinas/disciplinas.controller.ts
import { 
    Controller, Get, Post, Put, Delete, Body, Param, 
    UseGuards, Req, BadRequestException 
  } from '@nestjs/common';
  import { DisciplinasService } from './disciplinas.service';
  import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
  import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Roles } from '../auth/roles.decorator';
  import { RolesGuard } from '../auth/roles.guard';
  import { Request } from 'express';
  
  @Controller('disciplinas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class DisciplinasController {
    constructor(private readonly disciplinasService: DisciplinasService) {}
  
    // Apenas coordenadores podem criar disciplinas
    @Post()
    @Roles('coordenador')
    async create(@Body() createDisciplinaDto: CreateDisciplinaDto) {
      return await this.disciplinasService.create(createDisciplinaDto);
    }
  
    // Listar todas as disciplinas
    @Get()
    async findAll() {
      return await this.disciplinasService.findAll();
    }
  
    // Buscar disciplinas de uma escola específica
    @Get('escola/:id')
    async findByEscola(@Param('id') id: number) {
      return await this.disciplinasService.findByEscola(id);
    }
  
    // Buscar disciplinas de uma prefeitura específica
    @Get('prefeitura/:id')
    async findByPrefeitura(@Param('id') id: number) {
      return await this.disciplinasService.findByPrefeitura(id);
    }
  
    // Buscar uma disciplina específica
    @Get(':id')
    async findOne(@Param('id') id: number) {
      return await this.disciplinasService.findOne(id);
    }
  
    // Atualizar uma disciplina - apenas coordenadores
    @Put(':id')
    @Roles('coordenador')
    async update(
      @Param('id') id: number,
      @Body() updateDisciplinaDto: UpdateDisciplinaDto,
    ) {
      return await this.disciplinasService.update(id, updateDisciplinaDto);
    }
  
    // Remover uma disciplina - apenas coordenadores
    @Delete(':id')
    @Roles('coordenador')
    async remove(@Param('id') id: number) {
      return await this.disciplinasService.remove(id);
    }
  }