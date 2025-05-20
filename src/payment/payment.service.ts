/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { CreatePaymentRequest, PaymentServiceGrpc } from './types';

@Injectable()
export class PaymentService implements OnModuleInit {
  private paymentServiceClient: PaymentServiceGrpc;

  constructor(@Inject('PAYMENT_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.paymentServiceClient = this.client.getService<PaymentServiceGrpc>('PaymentService');
  }
  create(createPaymentDto: CreatePaymentDto) {
    const createPaymentRequest: CreatePaymentRequest = {
      orderId: createPaymentDto.orderId,
      customerId: createPaymentDto.customerId,
      amount: createPaymentDto.amount,
      paymentMethod: createPaymentDto.paymentMethod,
    };
    console.log('createPaymentRequest', createPaymentRequest);
    return this.paymentServiceClient.CreatePayment(createPaymentRequest);
  }

  getPayment(paymentId: string) {
    return this.paymentServiceClient.GetPayment({ paymentId });
  }
  refundPayment(paymentId: string) {
    return this.paymentServiceClient.RefundPayment({ paymentId });
  }

  // update payment status----------------
  updatePaymentStatus(id: string, status: string) {
    const payload = {
      transactionId: id,
      status,
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.paymentServiceClient.UpdatePaymentStatus(payload);
  }
}
