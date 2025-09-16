import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [
    // Load .env file
    ConfigModule.forRoot({ isGlobal: true }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: +config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USER', 'sms_user'),
        password: config.get<string>('DB_PASS', 'sms_pass'),
        database: config.get<string>('DB_NAME', 'sms_gateway'),
        autoLoadEntities: true, // automatically load entities
        synchronize: true, // ⚠️ dev only
      }),
    }),

    MessagesModule,
    DevicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
