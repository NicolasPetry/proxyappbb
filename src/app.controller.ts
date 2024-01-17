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
    const buffer = await this.appService.generatePdf(saveImgDto.imageScryFallUrl, saveImgDto.fileName)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }
}
