import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';

// Reusable enum for order status
export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PREPARING = 'PREPARING',
  WAITING_FOR_PICKUP = 'WAITING_FOR_PICKUP',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

// DTO for each order item
export class OrderItemDto {
  @IsString() // Assuming menuId is a string, adjust if it's a UUID
  @IsNotEmpty()
  menuId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

// DTO for creating a new order
export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsString() // Updated from IsUUID to IsString if you're using custom ID format like "res_456"
  @IsNotEmpty()
  restaurantId: string;

  @IsString() // Same here: assuming deliveryId may be like "del_789"
  @IsNotEmpty()
  deliveryId: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
