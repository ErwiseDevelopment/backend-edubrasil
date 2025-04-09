import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Obtém a instância do JwtAuthGuard do container, que já possui o Reflector injetado
  app.useGlobalGuards(app.get(JwtAuthGuard));
  await app.listen(3000);
}
bootstrap();
