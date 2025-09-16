import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Device } from '../devices/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Device])],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
