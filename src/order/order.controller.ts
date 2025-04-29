/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { errorResponse, successResponse } from 'utils/response';
import { firstValueFrom } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placedOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const result = await firstValueFrom(this.orderService.placeOrder(createOrderDto));
      return successResponse('Order placed successfully', result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return errorResponse(100, 'Failed to place order');
    }
  }

  @Get()
  async findAllOrder() {
    try {
      const result = await firstValueFrom(this.orderService.findAllOrder());
      return successResponse('All orders fetched', result);
    } catch (err) {
      return errorResponse(101, 'Failed to fetch orders');
    }
  }

  @Get(':id')
  async findOneOrder(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(this.orderService.findOneOrder(id));
      return successResponse('Order found', result);
    } catch (err) {
      return errorResponse(102, 'Order not found');
    }
  }

  @Post('update/status')
  async updateOrderStatus(@Body('orderId') id: string, @Body('status') status: string) {
    try {
      const result = await firstValueFrom(this.orderService.updateOrderStatus(id, status));
      return successResponse('Order status updated', result);
    } catch (err) {
      return errorResponse(103, 'Failed to update status');
    }
  }

  @Delete('remove')
  async removeOrder(@Body('orderId') id: string) {
    try {
      const result = await firstValueFrom(this.orderService.removeOrder(id));
      return successResponse('Order removed', result);
    } catch (err) {
      return errorResponse(104, 'Failed to remove order');
    }
  }

  @Get('user/:userId')
  async findUserOrders(@Param('userId') userId: string) {    
    try {
      console.log('Fetching orders for user:', userId);
      const result = await firstValueFrom(this.orderService.findOrdersByUser(userId));
      return successResponse('User orders fetched', result);
    } catch (err) {
      return errorResponse(105, 'Failed to fetch user orders');
    }
  }
}
