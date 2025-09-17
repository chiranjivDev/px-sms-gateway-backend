// src/logging/logs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsLog } from './sms-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(SmsLog)
    private readonly smsLogRepo: Repository<SmsLog>
  ) {}

  async getLogs({
    from,
    to,
    limit = 50,
  }: {
    from?: string;
    to?: string;
    limit?: number;
  }) {
    const query = this.smsLogRepo.createQueryBuilder('log');

    if (from) {
      query.andWhere('log.timestamp >= :from', { from });
    }
    if (to) {
      query.andWhere('log.timestamp <= :to', { to });
    }

    query.orderBy('log.timestamp', 'DESC').limit(limit);

    return query.getMany();
  }

  async logDeviceRegistration({ deviceId, name, userId, timestamp }: { deviceId: string; name: string; userId: string; timestamp: Date }) {
    await this.smsLogRepo.save({
      level: 'info',
      message: `Device registered: ${name} (${deviceId}) by user ${userId}`,
      toNumber: '',
      provider: '',
      error: '',
      timestamp,
    });
  }
}
