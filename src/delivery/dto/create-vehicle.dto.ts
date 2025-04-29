import { IsString, IsNumber, IsISO8601 } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  driverId: string;

  @IsString()
  vehicleType: string;

  @IsString()
  brandName: string;

  @IsString()
  modelName: string;

  @IsString()
  registrationNumber: string;

  @IsString()
  color: string;

  @IsNumber()
  year: number;

  @IsString()
  insuranceNumber: string;

  @IsISO8601()
  insuranceExpiry: string;
}
