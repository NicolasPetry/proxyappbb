import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScryfallApi } from './scryfall/scryfallApi';
import { Pdfservice } from './pdfService/pdfservice';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ScryfallApi, Pdfservice],
})
export class AppModule {}
