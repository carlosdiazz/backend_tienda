import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

//Propio
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService],
})
export class CronModule {}
