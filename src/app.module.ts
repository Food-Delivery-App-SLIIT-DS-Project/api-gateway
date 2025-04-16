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
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from './auth/types';
import { JwtStrategy } from './auth/strategy/JwtStrategy';
import { RestaurantService } from './restaurant/restaurant.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { RESTAURANT_PACKAGE_NAME, RESTAURANT_SERVICE_NAME } from './restaurant/types/restaurant';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ClientsModule.register([
      // Only include services NOT already registered in feature modules like RestaurantModule
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.AUTH_SERVICE_URL || 'localhost:50051',
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/auth.proto'),
        },
      },
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.USER_SERVICE_URL || 'localhost:50052',
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/user.proto'),
        },
      },
      {
        name: 'DELIVERY_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.DELIVERY_SERVICE_URL || 'delivery-service:50053',
          package: 'delivery',
          protoPath: join(__dirname, '../proto/delivery.proto'),
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.NOTIFICATION_SERVICE_URL || 'notification-service:50054',
          package: 'notification',
          protoPath: join(__dirname, '../proto/notification.proto'),
        },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.ORDER_SERVICE_URL || 'order-service:50055',
          package: 'order',
          protoPath: join(__dirname, '../proto/order.proto'),
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.PAYMENT_SERVICE_URL || 'payment-service:50056',
          package: 'payment',
          protoPath: join(__dirname, '../proto/payment.proto'),
        },
      },
      {
        name: RESTAURANT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.RESTAURANT_SERVICE_URL || 'localhost:50057',
          package: RESTAURANT_PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/restaurant.proto'), // adjust path as needed
        },
      },
      RestaurantModule,
    ]),
  ],
  controllers: [UserController, AuthController, AppController, RestaurantController],
  providers: [UserService, JwtStrategy, AuthService, RestaurantService],
  exports: [AuthService],
})
export class AppModule {}
