/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { OrderService } from './order.service';
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
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAllOrders({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneOrder({ orderId: id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.UpdateOrderStatus({
      orderId: id,
      status: updateOrderDto.status
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.removeOrder({ orderId: id });
  }
}
