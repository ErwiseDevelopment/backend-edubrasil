// src/prefeituras/prefeituras.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PrefeiturasService } from './prefeituras.service';
import { CreatePrefeituraDto } from './dto/create-prefeitura.dto';
import { UpdatePrefeituraDto } from './dto/update-prefeitura.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('prefeituras')
@UseGuards(JwtAuthGuard) // Aplica a autenticação a todas as rotas deste controller
export class PrefeiturasController {
  constructor(private readonly prefeiturasService: PrefeiturasService) {}

  @Post()
  async create(@Body() createPrefeituraDto: CreatePrefeituraDto) {
    return await this.prefeiturasService.create(createPrefeituraDto);
  }

  @Get()
  async findAll() {
    return await this.prefeiturasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.prefeiturasService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePrefeituraDto: UpdatePrefeituraDto) {
    return await this.prefeiturasService.update(id, updatePrefeituraDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.prefeiturasService.remove(id);
  }
}
