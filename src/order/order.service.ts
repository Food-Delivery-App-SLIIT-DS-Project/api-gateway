/* eslint-disable prettier/prettier */
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

  // get orders by restaurantId
  getOrderByRestaurantId(data: { restaurantId: string }) {
    // Logic to get orders by restaurantId
    return this.orderServiceClient.getOrderByRestaurantId(data);
  }
  // get orders by customerId
  getOrderByCustomerId(data: { customerId: string }) {
    // Logic to get orders by customerId
    return this.orderServiceClient.getOrderByCustomerId(data);
  }

  placeOrder(data: CreateOrderRequest) {
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
}
