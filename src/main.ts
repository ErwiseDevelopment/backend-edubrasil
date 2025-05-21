import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Ativa o CORS com as configurações padrão
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
  