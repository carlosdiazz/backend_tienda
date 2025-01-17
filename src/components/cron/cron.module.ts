import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

//Propio
import { CronService } from './cron.service';
import { TelegramModule } from '../telegram';
import { ProductosModule } from '../productos';

@Module({
  imports: [ScheduleModule.forRoot(), TelegramModule, ProductosModule],
  providers: [CronService],
})
export class CronModule {}
