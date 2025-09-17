import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { MessageState } from '../message.entity';

export class UpdateMessageStatusDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(MessageState)
  @IsNotEmpty()
  state: MessageState;
}
