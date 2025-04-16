import { IsNotEmpty } from 'class-validator';

class VerifyOneUserDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  isVerified: string;
}
export { VerifyOneUserDto };
