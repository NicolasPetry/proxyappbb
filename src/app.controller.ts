import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { SaveImgDto } from './dto/saveImgDto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/getPdf')
  @UsePipes(new ValidationPipe({transform: true}))
  async genPdf(@Res() res: Response, @Body() saveImgDto: SaveImgDto)
  {
    const buffer = await this.appService.generatePdfUniqueCard(saveImgDto.imageScryFallUrl, saveImgDto.illustration_id)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }

  @Post('/createImage')
  @UsePipes(new ValidationPipe({transform: true}))
  async createImage(@Res() res: Response, @Body() saveImgDto: SaveImgDto)
  {
    await this.appService.createAndSaveImage(saveImgDto.imageScryFallUrl, saveImgDto.illustration_id)
  }

  @Post('/getPdfList')
  @UsePipes(new ValidationPipe({transform: true}))
  async genPdfList(@Res() res: Response, @Body() saveImgsDto: SaveImgDto[])
  {
    const buffer = await this.appService.generatePdfListOfCards(saveImgsDto)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }

}
