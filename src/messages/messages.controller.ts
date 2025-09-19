import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';

@ApiTags('messages')
@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // POST /3rdparty/v1/message
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth('basic')
  @Post('3rdparty/v1/message')
  create(@Body() dto: CreateMessageDto, @Req() req) {
    const device = req.device; // <-- comes from BasicAuthGuard
    return this.messagesService.create(dto, device);
  }

  // GET /3rdparty/v1/message/:id
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth('basic')
  @Get('3rdparty/v1/message/:id')
  getMessageStatus(@Param('id') id: string) {
    return this.messagesService.getMessageStatus(id);
  }

  // PATCH /mobile/v1/message
  @UseGuards(BasicAuthGuard)
  @ApiBasicAuth('basic')
  @Patch('mobile/v1/message')
  updateMessageStatus(@Body() dto: UpdateMessageStatusDto) {
    return this.messagesService.updateMessageStatus(dto);
  }
}
