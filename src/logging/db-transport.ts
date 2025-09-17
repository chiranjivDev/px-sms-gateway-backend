// db-transport.ts
import Transport from 'winston-transport';
import { Repository } from 'typeorm';
import { SmsLog } from './sms-log.entity';

export class DBTransport extends Transport {
  constructor(private readonly smsLogRepo: Repository<SmsLog>) {
    super();
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => this.emit('logged', info));

    const { level, message, timestamp = new Date(), ...meta } = info;

    try {
      await this.smsLogRepo.save({
        level,
        message,
        toNumber: meta.toNumber || null,
        provider: meta.provider || null,
        error: meta.error || null,
        timestamp,
      });
    } catch (err) {
      console.error('Failed to write log to DB:', err);
    }

    callback();
  }
}
