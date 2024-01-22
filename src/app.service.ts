import { Injectable } from '@nestjs/common';
import { ScryfallApi } from './scryfall/scryfallApi';
import * as path from 'path'
import { Pdfservice } from './pdfService/pdfservice';

@Injectable()
export class AppService {

  constructor(
    private readonly scryfallService: ScryfallApi,
    private readonly pdfService: Pdfservice
    ) {}
  
  async generatePdf(imageUrl: string, imageName: string): Promise<Buffer> {

    const filePath = path.join(
      'images/',
      imageName
    ) 

    //contacting scryfall to get the image and then saving it
    const savedFileLocation = await this.scryfallService.getImage(imageUrl, filePath);

    //with the image in our possession we can now make a pdf
    const pdfBuffer = await this.pdfService.generatePDF(filePath);

    return pdfBuffer;
  }
  
}
