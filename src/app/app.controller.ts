import { Controller, Get, Res } from '@nestjs/common';

//Propio
import { AppService } from './app.service';
import { ResponsePropioHttp } from '../common';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public app(): ResponsePropioHttp {
    return this.appService.healthcheck();
  }

  @Get('healthcheck')
  public healthcheck(): ResponsePropioHttp {
    return this.appService.healthcheck();
  }
}
