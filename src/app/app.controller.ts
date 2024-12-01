import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

//Propio
import { AppService } from './app.service';
import { ResponsePropioHttp } from '../common';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  serveHtml(@Res() res: Response) {
    const htmlContent = fs.readFileSync('../../public/index.html', 'utf8'); // Reemplaza 'ruta_al_archivo.html' con la ruta real de tu archivo HTML
    res.send(htmlContent);
  }

  @Get('healthcheck')
  public healthcheck(): ResponsePropioHttp {
    return this.appService.healthcheck();
  }
}
