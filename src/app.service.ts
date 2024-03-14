import { Injectable } from '@nestjs/common';
import { ScryfallApi } from './scryfall/scryfallApi';
import * as path from 'path'
import { Pdfservice } from './pdfService/pdfservice';
import * as fs from 'fs';
import { SaveImgDto } from './dto/saveImgDto';

@Injectable()
export class AppService {

  constructor(
    private readonly scryfallService: ScryfallApi,
    private readonly pdfService: Pdfservice
    ) {}
  
  /**
   * generate a PDF with 9 occurences of a card
   * 
   * @param imageUrl the image URL in scryfall Database
   * @param illustration_id unique ID to differentiate between different arts of the same cards >> ID used locally to store image
   * @returns PDF
   */
  async generatePdfUniqueCard(imageUrl: string, illustration_id: string): Promise<Buffer> {

    const filePath = (await this.createAndSaveImage(imageUrl, illustration_id)).toString()

    //with the image in our possession we can now make a pdf featuring the image
    const pdfBuffer = await this.pdfService.generatePDF(filePath);

    return pdfBuffer;
  }

  /**
   * create a file path, if image does not exist locally then find it and save it
   * 
   * @param imageUrl the image URL in scryfall Database
   * @param illustration_id unique ID to differentiate between different arts of the same cards >> ID used locally to store image 
   * @returns the image Path
   */
  async createAndSaveImage(imageUrl: string, illustration_id: string): Promise<string> {

    //creating filePaht based on unique ID
    const filePath = path.join(
      'images/',
      `${illustration_id}.jpg`
    ) 

    //if files does not exist >> find the image from scryfall api
    if (!fs.existsSync(filePath)) {
      const savedFileLocation = await this.scryfallService.getImage(imageUrl, filePath);
    }
  
    return filePath;
  }

  async generatePdfListOfCards(list: SaveImgDto[]): Promise<Buffer> {

    const filesPath = []

    list.forEach(e => {
      let filePath = path.join(
        'images/',
        `${e.illustration_id}.jpg`
      ) 

      if (!fs.existsSync(filePath)) {
        const savedFileLocation = this.scryfallService.getImage(e.imageScryFallUrl, filePath);
      }
      filesPath.push(filePath)
    })

    //with the image in our possession we can now make a pdf featuring the image
    const pdfBuffer = await this.pdfService.generatePdfListOfCards(filesPath);

    return pdfBuffer;

  }
 
}
