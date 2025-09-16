import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Device } from '../devices/device.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
  ) {}

  async create(dto: CreateMessageDto) {
    const device = await this.deviceRepo.findOneBy({ id: dto.deviceId });
    if (!device) throw new Error('Device not found');

    const message = this.messageRepo.create({
      ...dto,
      device,
    });

    return this.messageRepo.save(message);
  }

  findAll() {
    return this.messageRepo.find({ relations: ['device'] });
  }
}
