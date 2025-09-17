// src/logging/logs.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { LogsService } from './logs.service';

@ApiTags('Logs')
@Controller('3rdparty/v1')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('logs')
  @ApiOperation({ summary: 'Retrieve logs within a time range' })
  @ApiQuery({
    name: 'from',
    required: false,
    type: String,
    format: 'date-time',
    description: 'The start of the time range for the logs to retrieve. Logs created after this timestamp will be included.',
    example: '2025-09-01T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    type: String,
    format: 'date-time',
    description: 'The end of the time range for the logs to retrieve. Logs created before this timestamp will be included.',
    example: '2025-09-17T23:59:59.000Z',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Max number of logs to return',
    example: 50,
  })
  @ApiResponse({
    status: 200,
    description: 'List of logs',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          level: { type: 'string', example: 'info' },
          message: { type: 'string', example: 'SMS sent successfully' },
          toNumber: { type: 'string', example: '+91XXXXXXXXXX' },
          provider: { type: 'string', example: 'Twilio' },
          error: { type: 'string', example: null },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2025-09-17T14:00:00.000Z',
          },
        },
      },
    },
  })
  async getLogs(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: number
  ) {
    return this.logsService.getLogs({ from, to, limit });
  }
}
