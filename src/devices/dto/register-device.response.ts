import { ApiProperty } from '@nestjs/swagger';

export class RegisterDeviceResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
