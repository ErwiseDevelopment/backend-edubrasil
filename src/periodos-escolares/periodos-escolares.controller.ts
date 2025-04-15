// src/periodos-escolares/periodos-escolares.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { PeriodosEscolaresService } from './periodos-escolares.service';
import { CreatePeriodoEscolarDto } from './dto/create-periodo-escolar.dto';
import { UpdatePeriodoEscolarDto } from './dto/update-periodo-escolar.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('periodos-escolares')
@UseGuards(JwtAuthGuard)
export class PeriodosEscolaresController {
  constructor(private readonly periodosEscolaresService: PeriodosEscolaresService) {}

  @Post()
  async create(@Body() createPeriodoEscolarDto: CreatePeriodoEscolarDto) {
    return await this.periodosEscolaresService.create(createPeriodoEscolarDto);
  }

  @Get()
  async findAll() {
    return await this.periodosEscolaresService.findAll();
  }

  @Get('escola/:id')
  async findByEscola(@Param('id') id: number) {
    return await this.periodosEscolaresService.findByEscola(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.periodosEscolaresService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePeriodoEscolarDto: UpdatePeriodoEscolarDto,
  ) {
    return await this.periodosEscolaresService.update(id, updatePeriodoEscolarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.periodosEscolaresService.remove(id);
  }
}   