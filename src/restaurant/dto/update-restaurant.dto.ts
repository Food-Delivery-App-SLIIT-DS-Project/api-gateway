import { IsString, IsNotEmpty, IsBoolean, IsLatitude, IsLongitude } from 'class-validator';

export class LocationDto {
  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;
}

export class UpdateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @IsNotEmpty()
  location: LocationDto;
  @IsNotEmpty()
  address: string;

  // Removed duplicate location property

  @IsString()
  @IsNotEmpty()
  phone: string;

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

  @IsBoolean()
  isOpen: boolean;

  @IsBoolean()
  isVerified: boolean;
}
