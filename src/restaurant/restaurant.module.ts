import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RESTAURANT_SERVICE_NAME } from './types/restaurant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RESTAURANT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50057', // or service URL if in Docker
          package: 'restaurant',
          protoPath: join(__dirname, '../../proto/restaurant.proto'),
        },
      },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
