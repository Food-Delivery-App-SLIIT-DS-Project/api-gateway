import { IsNotEmpty, IsString } from 'class-validator';

class FindAllUserByIsVerifiedDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
export { FindAllUserByIsVerifiedDto };
