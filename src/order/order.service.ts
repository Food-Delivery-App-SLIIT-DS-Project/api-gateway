import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ORDER_SERVICE_NAME, OrderServiceClient } from './types/order';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService implements OnModuleInit {
  private orderServiceClient: OrderServiceClient;
  constructor(@Inject(ORDER_SERVICE_NAME) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.orderServiceClient = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }
  placeOrder(data: CreateOrderDto) {
    // Logic to place an order
    return this.orderServiceClient.createOrder(data);
  }
  // get all order ----------------
  findAllOrder() {
    // Logic to get all orders
    return this.orderServiceClient.findAllOrders({});
  }
  // get one order ----------------
  findOneOrder(id: string) {
    // Logic to get one order
    return this.orderServiceClient.findOneOrder({ orderId: id });
  }
  // update order status ----------------
  updateOrderStatus(id: string, status: string) {
    // Logic to update order status
    return this.orderServiceClient.updateOrderStatus({ orderId: id, status });
  }
  // remove order ----------------
  removeOrder(id: string) {
    // Logic to remove an order
    return this.orderServiceClient.removeOrder({ orderId: id });
  }

  // get all order by userId ----------------
  findOrdersByUser(userId: string) {
    // Logic to get all orders by userId
    return this.orderServiceClient.findOrdersByUser({ userId });
  }
}
