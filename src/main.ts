import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Remova a aplicação global do JwtAuthGuard aqui
  await app.listen(3000);
}
bootstrap();
