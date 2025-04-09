import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrefeiturasModule } from './prefeituras/prefeituras.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EscolasModule } from './escolas/escolas.module';


@Module({
  imports: [PrefeiturasModule, AuthModule, UsuariosModule, EscolasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
