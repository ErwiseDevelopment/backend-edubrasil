// src/turmas/turmas.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('turmas')
@UseGuards(JwtAuthGuard)
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  async create(@Body() createTurmaDto: CreateTurmaDto) {
    return await this.turmasService.create(createTurmaDto);
  }

  @Get()
  async findAll() {
    return await this.turmasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.turmasService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTurmaDto: UpdateTurmaDto) {
    return await this.turmasService.update(id, updateTurmaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.turmasService.remove(id);
  }
}