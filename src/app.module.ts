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
    
    ConfigModule.forRoot({ isGlobal: true }),

    // Register microservices (gRPC clients)
    ClientsModule.register([

         // Register the user service client------------------
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.USER_SERVICE_URL || 'localhost:50052',
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../proto/user.proto'),
        },
      },
     
      // Register the delivery service client------------------------
      {
        name: 'DELIVERY_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.DELIVERY_SERVICE_URL || 'localhost:50053',
          package: 'delivery',
          protoPath: join(__dirname, '../../proto/delivery.proto'),
        },
      },
      // Register the notification service client-------------------------
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.NOTIFICATION_SERVICE_URL || 'localhost:50054',
          package: 'notification',
          protoPath: join(__dirname, '../../proto/notification.proto'),
        },
      },
      // Register the order service client-------------------------
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.ORDER_SERVICE_URL || 'localhost:50055',
          package: 'order',
          protoPath: join(__dirname, '../../proto/order.proto'),
        },
      },
       // Register the payment service client--------------------------
       {
        name: 'PAYMENT_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.PAYMENT_SERVICE_URL || 'localhost:50056',
          package: 'payment',
          protoPath: join(__dirname, '../../proto/payment.proto'),
        },
      },
      // Register the restaurant service client---------------------
      {
        name: 'RESTAURANT_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.RESTAURANT_SERVICE_URL || 'localhost:50057',
          package: 'restaurant',
          protoPath: join(__dirname, '../../proto/restaurant.proto'),
        },
      },
      

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
