import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  DELIVERY_PERSONNEL = 'delivery_personnel',
  RESTAURANT = 'restaurant',
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsBoolean()
  isVerified: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  fcmToken?: string;
}
