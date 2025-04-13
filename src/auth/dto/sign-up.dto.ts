/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  DELIVERY_PERSONNEL = 'delivery_personnel',
}

export enum VerificationStatus {
  VERIFIED = 'verified',
  UNVERIFIED = 'pending',
  REJECTED = 'rejected',
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

  @IsEnum(VerificationStatus)
  isVerified: VerificationStatus;

  @IsString()
  @IsNotEmpty()
  password: string;
}
