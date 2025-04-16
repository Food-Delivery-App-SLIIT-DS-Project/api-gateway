import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  DELIVERY_PERSONNEL = 'delivery_personnel',
  RESTAURANT = 'restaurant',
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  isVerified: string;
}
