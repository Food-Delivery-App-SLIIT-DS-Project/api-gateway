/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequest } from './types/order';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface OrderServiceClient {
  createOrder(data: any): Observable<any>;
  findAllOrders(data: {}): Observable<any>;
  findOneOrder(data: { orderId: string }): Observable<any>;
  UpdateOrderStatus(data: { orderId: string, status: string }): Observable<any>;
  removeOrder(data: { orderId: string }): Observable<any>;
}

@Controller('order')
export class OrderController {
  private orderService: OrderServiceClient;

  constructor(
    @Inject('ORDER_SERVICE') private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.orderService = this.client.getService<OrderServiceClient>('OrderService');
  }

  @Post()
  placedOrder(@Body() createOrderDto: CreateOrderRequest) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    console.log('place order controller---------------------');
    return this.orderService.placeOrder(createOrderDto);
  }
}
