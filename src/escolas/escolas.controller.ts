import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EscolasService } from './escolas.service';
import { CreateEscolaDto } from './dto/create-escola.dto';
import { UpdateEscolaDto } from './dto/update-escola.dto';

@Controller('escolas')
export class EscolasController {
  constructor(private readonly escolasService: EscolasService) {}

  // Rota para criar uma nova escola
  @Post()
  async create(@Body() createEscolaDto: CreateEscolaDto) {
    return await this.escolasService.create(createEscolaDto);
  }

  // Rota para buscar todas as escolas
  @Get()
  async findAll() {
    return await this.escolasService.findAll();
  }

  // Rota para buscar uma escola por ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.escolasService.findOne(id);
  }
  
  // Rota para atualizar uma escola
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEscolaDto: UpdateEscolaDto) {
    return await this.escolasService.update(id, updateEscolaDto);
  }

  // Rota para deletar uma escola
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.escolasService.remove(id);
  }
}
