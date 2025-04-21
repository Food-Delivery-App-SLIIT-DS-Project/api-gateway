import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment.dto';

interface PaymentServiceGrpc {
  CreatePayment(data: CreatePaymentRequest): any;
  GetPayment(data: { paymentId: string }): any;
  RefundPayment(data: { paymentId: string }): any;
}

interface CreatePaymentRequest {
  orderId: string;
  customerId: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
}

@Controller('payment')
export class PaymentController implements OnModuleInit {
  private paymentService: PaymentServiceGrpc;

  constructor(@Inject('PAYMENT_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.paymentService = this.client.getService<PaymentServiceGrpc>('PaymentService');
  }

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const createPaymentRequest: CreatePaymentRequest = {
      orderId: createPaymentDto.orderId,
      customerId: createPaymentDto.customerId,
      amount: createPaymentDto.amount,
      paymentMethod: createPaymentDto.paymentMethod,
      transactionId: createPaymentDto.transactionId,
    };
    console.log('createPaymentRequest', createPaymentRequest);
    return this.paymentService.CreatePayment(createPaymentRequest);
  }

  @Get(':id')
  async getPayment(@Param('id') paymentId: string) {
    return this.paymentService.GetPayment({ paymentId });
  }

  @Post('refund/:id')
  async refundPayment(@Param('id') paymentId: string) {
    return this.paymentService.RefundPayment({ paymentId });
  }
}
