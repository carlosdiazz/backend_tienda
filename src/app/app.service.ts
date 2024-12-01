import { Injectable } from '@nestjs/common';

//Propio
import { ResponsePropioHttp } from '../common/dto/response';
import { envs } from './../config/envs';

@Injectable()
export class AppService {
  public healthcheck(): ResponsePropioHttp {
    return {
      message: 'Server On',
      statusCode: 200,
    };
  }
}
