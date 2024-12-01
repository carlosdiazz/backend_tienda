import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor() {}
  private readonly logger = new Logger('CronService');

  //Se ejecutara todos los dias a la 12:05
  @Cron('5 0 * * *')
  private async calcular_estadisitca() {}
}
