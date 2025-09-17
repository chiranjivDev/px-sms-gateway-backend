import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Device } from '../devices/device.entity';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
  ) {}

  async create(dto: CreateMessageDto) {
    // const device = await this.deviceRepo.findOneBy({ id: dto.deviceId });
    // if (!device) throw new Error('Device not found');

    const message = this.messageRepo.create({
      ...dto,
      // device,
    });

    return this.messageRepo.save(message);
  }

  // findAll() {
  //   return this.messageRepo.find({ relations: ['device'] });
  // }

  async getMessageStatus(id: string) {
    const message = await this.messageRepo.findOneBy({ id });
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return { id: message.id, status: message.state };
  }

  async updateMessageStatus(dto: UpdateMessageStatusDto) {
    const message = await this.messageRepo.findOneBy({ id: dto.id });
    if (!message) {
      throw new NotFoundException(`Message with id ${dto.id} not found`);
    }

    message.state = dto.state;
    await this.messageRepo.save(message);

    return { id: message.id, state: message.state };
  }
}
