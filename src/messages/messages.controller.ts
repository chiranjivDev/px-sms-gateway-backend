import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';

@ApiTags('messages')
@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // POST /3rdparty/v1/message
  @Post('3rdparty/v1/message')
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }

  // GET /3rdparty/v1/message/:id
  @Get('3rdparty/v1/message/:id')
  getMessageStatus(@Param('id') id: string) {
    return this.messagesService.getMessageStatus(id);
  }

  // PATCH /mobile/v1/message
  @Patch('mobile/v1/message')
  updateMessageStatus(@Body() dto: UpdateMessageStatusDto) {
    return this.messagesService.updateMessageStatus(dto);
  }
}
