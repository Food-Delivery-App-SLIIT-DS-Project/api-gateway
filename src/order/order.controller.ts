/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequest } from './types/order';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  placedOrder(@Body() createOrderDto: CreateOrderRequest) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    console.log('place order controller---------------------');
    return this.orderService.placeOrder(createOrderDto);
  }
}
