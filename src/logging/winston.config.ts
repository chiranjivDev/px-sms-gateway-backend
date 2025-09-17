// winston.config.ts
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { DBTransport } from './db-transport';
import { SmsLog } from './sms-log.entity';
import { Repository } from 'typeorm';

export const createWinstonConfig = (smsLogRepo: Repository<SmsLog>): WinstonModuleOptions => ({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new DBTransport(smsLogRepo),
  ],
});
