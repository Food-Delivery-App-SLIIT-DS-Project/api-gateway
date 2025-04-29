import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  cuisineType: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  openHours: string;

  @IsString()
  @IsNotEmpty()
  imageReference: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  location: {
    longitude: number;
    latitude: number;
  };
}
