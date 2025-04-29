/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  fcmToken?: string;
}

export { SignInDto };
