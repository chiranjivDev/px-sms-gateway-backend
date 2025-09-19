import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { MessageState } from '../message.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageStatusDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the message to update',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @IsEnum(MessageState)
  @IsNotEmpty()
  @ApiProperty({
    description: 'New state of the message',
    enum: MessageState,
    example: MessageState.Delivered,
  })
  state: MessageState;
}
