import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderRequest, ORDER_SERVICE_NAME, OrderServiceClient } from './types/order';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class OrderService implements OnModuleInit {
  private orderServiceClient: OrderServiceClient;
  constructor(@Inject(ORDER_SERVICE_NAME) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.orderServiceClient = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }
  placeOrder(createOrderDto: CreateOrderRequest) {
    // Logic to place an order
    return this.orderServiceClient.placeOrder(createOrderDto);
  }
}
