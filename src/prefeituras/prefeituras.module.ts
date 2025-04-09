import { Module } from '@nestjs/common';
import { PrefeiturasController } from './prefeituras.controller';
import { PrefeiturasService } from './prefeituras.service';

@Module({
  controllers: [PrefeiturasController],
  providers: [PrefeiturasService]
})
export class PrefeiturasModule {}
