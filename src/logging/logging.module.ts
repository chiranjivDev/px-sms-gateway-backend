// logging.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { SmsLog } from './sms-log.entity';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { createWinstonConfig } from './winston.config';

@Module({
  imports: [TypeOrmModule.forFeature([SmsLog])],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LoggingModule {
  static forRoot(smsLogRepo): any {
    return WinstonModule.forRoot(createWinstonConfig(smsLogRepo));
  }
}
