import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor() {}
  private readonly logger = new Logger('CronService');

  @Cron('5 0 * * *')
  private async verificar_stock() {}
}
