import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    CONFIRMED = 'CONFIRMED',
    PREPARING = 'PREPARING',
    WAITING_FOR_PICKUP = 'WAITING_FOR_PICKUP',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERED = 'DELIVERED'
  }


  export class UpdateOrderDto {
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;
  }
