/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from './user/types';

@Module({
  imports: [
    // Load configuration from .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Register microservices (gRPC clients)
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.USER_SERVICE_URL || 'localhost:50052',
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../proto/user.proto'),
        },
      }
    ]),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService
  ],
})
export class AppModule {}
