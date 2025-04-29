/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';
import { status } from '@grpc/grpc-js';
import { firstValueFrom } from 'rxjs';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const result = await firstValueFrom(this.paymentService.create(createPaymentDto));
      return {
        code: 0,
        msg: 'Payment created successfully',
        data: result,
      };
    } catch (error) {
      return this.handleGrpcError(error);
    }
  }

  @Get(':id')
  async getPayment(@Param('id') paymentId: string) {
    try {
      const result = await firstValueFrom(this.paymentService.getPayment(paymentId));
      return {
        code: 0,
        msg: 'Payment fetched successfully',
        data: result,
      };
    } catch (error) {
      return this.handleGrpcError(error);
    }
  }

  @Post('refund/:id')
  async refundPayment(@Param('id') paymentId: string) {
    try {
      const result = await firstValueFrom(this.paymentService.refundPayment(paymentId));
      return {
        code: 0,
        msg: 'Payment refunded successfully',
        data: result,
      };
    } catch (error) {
      return this.handleGrpcError(error);
    }
  }

  @Get()
  async findAllPayments() {
    try {
      const result = await firstValueFrom(this.paymentService.findAllPayments());
      return {
        code: 0,
        msg: 'Payments fetched successfully',
        data: result.payments,
      };
    } catch (error) {
      return this.handleGrpcError(error);
    }
  }

  @Get('user/:customerId')
  async findPaymentsByUser(@Param('customerId') customerId: string) {
    try {
      const result = await firstValueFrom(this.paymentService.findPaymentsByUser(customerId));
      return {
        code: 0,
        msg: 'Payments fetched successfully',
        data: result.payments,
      };
    } catch (error) {
      return this.handleGrpcError(error);
    }
  }

  private handleGrpcError(error: any) {
    const code = error.code || status.UNKNOWN;
    const msg = error.message || 'Something went wrong';
    return {
      code,
      msg,
      data: null,
    };
  }
}
