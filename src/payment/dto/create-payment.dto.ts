/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  customerId: string;

  @IsNumber()
  amount: number;
  
  @IsString()
  status: string = 'PENDING';

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}
