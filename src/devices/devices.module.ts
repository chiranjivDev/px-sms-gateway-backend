import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';


import { LoggingModule } from '../logging/logging.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), LoggingModule],
  providers: [DevicesService],
  controllers: [DevicesController],
})
export class DevicesModule {}
