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

import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './order/types/order';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { MenuController } from './restaurant/menu/menu.controller';
import { MenuService } from './restaurant/menu/menu.service';
import { MENU_PACKAGE_NAME } from './restaurant/types/menu';
import { VehicleController } from './delivery/vehicle/vehicle.controller';
import { DeliveryController } from './delivery/delivery.controller';
import { VehicleService } from './delivery/vehicle/vehicle.service';
import { DeliveryService } from './delivery/delivery.service';
import { DELIVERY_PACKAGE_NAME, DELIVERY_SERVICE_NAME } from './delivery/types/delivery';
import { VEHICLE_PACKAGE_NAME } from './delivery/types/vehicle';
import { EMAIL_PACKAGE_NAME, EMAIL_SERVICE_NAME } from './email/types/email';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ClientsModule.register([
      // Only include services NOT already registered in feature modules like RestaurantModule
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.AUTH_SERVICE_URL || '0.0.0.0:50051',
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/auth.proto'),
        },
      },
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.USER_SERVICE_URL || '0.0.0.0:50052',
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/user.proto'),
        },
      },
      {
        name: DELIVERY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.DELIVERY_SERVICE_URL || 'localhost:50053',
          package: [
            DELIVERY_PACKAGE_NAME,
            VEHICLE_PACKAGE_NAME
          ],
          protoPath: [
            join(__dirname, '../proto/delivery.proto'),
            join(__dirname, '../proto/vehicle.proto')
          ]
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
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.ORDER_SERVICE_URL || '0.0.0.0:50055',
          package: ORDER_PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/order.proto'),
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.PAYMENT_SERVICE_URL || '0.0.0.0:50056',
          package: 'payment',
          protoPath: join(__dirname, '../proto/payment.proto'),
        },
      },
      {
        name: RESTAURANT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.RESTAURANT_SERVICE_URL || '0.0.0.0:50057',
          package: [RESTAURANT_PACKAGE_NAME, MENU_PACKAGE_NAME],
          protoPath: [join(__dirname, '../proto/restaurant.proto'), join(__dirname, '../proto/menu.proto')],
        },
      },
      {
        name: EMAIL_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.EMAIL_SERVICE_URL || '0.0.0.0:50058',
          package: EMAIL_PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/email.proto')
        },
      }
    ]),
  ],
  controllers: [
    UserController,
    AuthController,
    AppController,
    RestaurantController,
    OrderController,
    PaymentController,
    MenuController,
    VehicleController,
    DeliveryController,
    EmailController
  ],
  providers: [UserService, JwtStrategy, AuthService, RestaurantService, OrderService, PaymentService, MenuService,
    VehicleService, DeliveryService, EmailService
  ],
  exports: [AuthService],
})
export class AppModule {}
