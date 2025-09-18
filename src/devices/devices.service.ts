import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { RegisterDeviceResponse } from './dto/register-device.response';

import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt';
import { LogsService } from '../logging/logs.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
    private readonly logsService: LogsService,
  ) {}

  private generateLoginAndPassword(id: string) {
    const login = id.substring(0, 6).toUpperCase();
    const password = id.substring(7).toLowerCase();
    return { login, password };
  }

  async register(
    dto: RegisterDeviceDto,
    privateToken?: string,
  ): Promise<RegisterDeviceResponse> {
    // TODO: check mode (public/private) and validate privateToken
    // Example: throw new UnauthorizedException() if private mode + token mismatch

    const userId = nanoid(21);
    const { login, password } = this.generateLoginAndPassword(userId);
    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Persist user (User entity/table) here if you want full auth support

    const deviceId = nanoid(21);
    const authToken = nanoid(21);

    const device = this.deviceRepo.create({
      id: deviceId,
      name: dto.name ?? '',
      pushToken: dto.pushToken,
      authToken,
      userId: login, // using login as UserID reference
    });

    await this.deviceRepo.save(device);

    // Log the device registration event
    await this.logsService.logDeviceRegistration({
      deviceId,
      name: dto.name ?? '',
      userId: login,
      timestamp: new Date(),
    });

    return {
      id: deviceId,
      token: authToken,
      login,
      password,
    };
  }

  async findAll(): Promise<Device[]> {
    return this.deviceRepo.find();
  }
}
