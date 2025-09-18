// import { ApiProperty } from '@nestjs/swagger';
// import {
//   IsBoolean,
//   IsDateString,
//   IsEnum,
//   IsInt,
//   IsOptional,
//   IsString,
// } from 'class-validator';
// import { MessageState } from '../message.entity';

// export class CreateMessageDto {
//   @ApiProperty()
//   @IsString()
//   message: string;

//   @IsString()
//   phoneNumber: string;

//   @ApiProperty()
//   @IsBoolean()
//   is_encrypted: boolean;

//   @ApiProperty({ required: false, nullable: true })
//   @IsOptional()
//   @IsInt()
//   sim_number?: number;

//   @ApiProperty({ required: false, nullable: true })
//   @IsOptional()
//   @IsInt()
//   ttl?: number;

//   @ApiProperty({ required: false, nullable: true })
//   @IsOptional()
//   @IsDateString()
//   valid_until?: Date;

//   @ApiProperty()
//   @IsBoolean()
//   with_delivery_report: boolean;

//   @ApiProperty({ enum: MessageState, default: MessageState.Pending })
//   @IsOptional()
//   @IsEnum(MessageState)
//   state?: MessageState;

//   @ApiProperty()
//   @IsString()
//   deviceId: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MessageState } from '../message.entity';

export class CreateMessageDto {
  @ApiProperty({ description: 'SMS text message' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Recipient phone number' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ enum: MessageState, default: MessageState.Pending })
  @IsOptional()
  @IsEnum(MessageState)
  state?: MessageState;

  @ApiProperty({ description: 'Gateway device ID' })
  @IsString()
  deviceId: string;
}
