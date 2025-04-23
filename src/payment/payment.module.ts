import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: 'PAYMENT_SERVICE',
          transport: Transport.GRPC,
          options: {
            url: process.env.ORDER_SERVICE_URL || '0.0.0.0:50056',
            package: 'payment',
            protoPath: join(__dirname, '../../proto/payment.proto'),
          },
        },
      ]),
    ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
