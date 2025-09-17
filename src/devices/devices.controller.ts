import { Body, Controller, Get, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { RegisterDeviceResponse } from './dto/register-device.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('devices')
@Controller()
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  // Mobile app → register device
  @Post('mobile/v1/device')
  async register(
    @Body() dto: RegisterDeviceDto,
  ): Promise<RegisterDeviceResponse> {
    return this.devicesService.register(dto);
  }

  // 3rd-party → list all devices
  @Get('3rdparty/v1/device')
  async findAll() {
    return this.devicesService.findAll();
  }
}
