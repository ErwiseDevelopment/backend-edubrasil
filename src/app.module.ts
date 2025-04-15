// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrefeiturasModule } from './prefeituras/prefeituras.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EscolasModule } from './escolas/escolas.module';
import { PeriodosEscolaresModule } from './periodos-escolares/periodos-escolares.module';
import { TurmasModule } from './turmas/turmas.module';
import { DisciplinasModule } from './disciplinas/disciplinas.module';

@Module({
  imports: [
    PrefeiturasModule, 
    AuthModule, 
    UsuariosModule, 
    EscolasModule,
    PeriodosEscolaresModule,
    TurmasModule,
    DisciplinasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}