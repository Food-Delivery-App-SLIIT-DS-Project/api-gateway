import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GoOnlineDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsNumber()
  @IsNotEmpty()
  lat: number;
  @IsNumber()
  @IsNotEmpty()
  lng: number;
}
