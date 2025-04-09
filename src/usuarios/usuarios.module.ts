// src/usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // Exporta o serviço para que outros módulos possam usá-lo
})
export class UsuariosModule {}
