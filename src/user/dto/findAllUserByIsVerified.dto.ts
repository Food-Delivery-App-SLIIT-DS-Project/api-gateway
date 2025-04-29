import { IsBoolean, IsNotEmpty } from 'class-validator';

class FindAllUserByIsVerifiedDto {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
export { FindAllUserByIsVerifiedDto };
