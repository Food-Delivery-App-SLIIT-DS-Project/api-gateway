/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { errorResponse, successResponse } from 'utils/response';
import { firstValueFrom } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // create order

  @Post()
  async placedOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('Placing order with DTO:', createOrderDto);
    const dto = createOrderDto;

    try {
      // Ensure conversion to gRPC-safe types
      const grpcPayload = {
        ...dto,
        status: dto.status.toString(), // Convert enum to string
        deliveryId: dto.deliveryId || '', // Avoid undefined
      };

      const result = await firstValueFrom(this.orderService.placeOrder(grpcPayload));
      return successResponse('Order placed successfully', result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error('Error placing order:', err);
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

  // get orders by restauantId
  @Get('restaurant/:id')
  async getOrderByRestaurantId(@Param('id') restaurantId: string) {
    try {
      const result = await firstValueFrom(this.orderService.getOrderByRestaurantId({ restaurantId }));
      return successResponse('Orders fetched by restaurant ID', result);
    } catch (err) {
      return errorResponse(100, 'Failed to fetch orders by restaurant ID');
    }
  }
  // get orders by customerId
  @Get('customer/:id')
  async getOrderByCustomerId(@Param('id') customerId: string) {
    try {
      const result = await firstValueFrom(this.orderService.getOrderByCustomerId({ customerId }));
      return successResponse('Orders fetched by customer ID', result);
    } catch (err) {
      return errorResponse(101, 'Failed to fetch orders by customer ID');
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
}
