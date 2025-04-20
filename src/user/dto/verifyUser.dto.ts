import { IsNotEmpty, IsBoolean } from 'class-validator';

class VerifyOneUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;
}
export { VerifyOneUserDto };
