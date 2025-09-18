import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Device } from '../devices/device.entity';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly firebaseService: FirebaseService,
    @InjectRepository(Device) private readonly deviceRepo: Repository<Device>,
  ) {}

  async create(dto: CreateMessageDto) {
    // 1. Find device
    const device = await this.deviceRepo.findOneBy({ id: dto.deviceId });
    if (!device) throw new Error('Device not found');

    // 2. Save the message
    const message = this.messageRepo.create({
      ...dto,
      // device, // need to setup relation
    });
    await this.messageRepo.save(message);

    // 3. Build FCM payload
    const payload = {
      notification: {
        title: 'New SMS Request',
        body: 'Send this SMS via gateway',
      },
      data: {
        id: message.id,
        phoneNumber: dto.phoneNumber,
        message: dto.content,
      },
    };

    const fcmToken = device.pushToken || '';

    // 4. Send FCM push to device
    await this.firebaseService.sendToDevice(fcmToken, payload);

    return message;
  }

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
