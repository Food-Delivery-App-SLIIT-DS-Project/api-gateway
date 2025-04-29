/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';

import { lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehicleService } from './vehicle.service';
import { VehicleResponse } from 'utils/vehicle-response.interface';
import { successResponse } from '../../../utils/response';
import { UpdateVehicleAvailabilityDto, VehicleLocation } from '../types/vehicle';
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = await lastValueFrom(
        this.vehicleService.createVehicle(createVehicleDto).pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    message: err?.message || 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const response: VehicleResponse = {
        code: '200',
        message: 'success',
        data: {
          vehicle_id: vehicle.vehicleId,
          driver_id: vehicle.driverId,
          vehicle_type: vehicle.vehicleType,
          brand_name: vehicle.brandName,
          model_name: vehicle.modelName,
          registration_number: vehicle.registrationNumber,
          color: vehicle.color,
          year: vehicle.year,
          insurance_number: vehicle.insuranceNumber,
          insurance_expiry: vehicle.insuranceExpiry,
          availability: vehicle.availability,
          created_at: vehicle.createdAt,
          updated_at: vehicle.updatedAt,
        },
      };

      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get all vehicles
  @Get()
  async getAllVehicles() {
    try {
      const vehicleList = await lastValueFrom(
        this.vehicleService.getAllVehicles().pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const formattedVehicles = vehicleList.vehicles.map((v) => ({
        vehicle_id: v.vehicleId,
        driver_id: v.driverId,
        vehicle_type: v.vehicleType,
        brand_name: v.brandName,
        model_name: v.modelName,
        registration_number: v.registrationNumber,
        color: v.color,
        year: v.year,
        insurance_number: v.insuranceNumber,
        insurance_expiry: v.insuranceExpiry,
        availability: v.availability,
        created_at: v.createdAt,
        updated_at: v.updatedAt,
      }));

      const response = successResponse('success', formattedVehicles);
      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get vehicle by id
  @Get(':id')
  async getVehicleById(@Param('id') vehicleId: string) {
    try {
      const vehicle = await lastValueFrom(
        this.vehicleService.getVehicleById({ vehicleId }).pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const response: VehicleResponse = {
        code: '200',
        message: 'success',
        data: {
          vehicle_id: vehicle.vehicleId,
          driver_id: vehicle.driverId,
          vehicle_type: vehicle.vehicleType,
          brand_name: vehicle.brandName,
          model_name: vehicle.modelName,
          registration_number: vehicle.registrationNumber,
          color: vehicle.color,
          year: vehicle.year,
          insurance_number: vehicle.insuranceNumber,
          insurance_expiry: vehicle.insuranceExpiry,
          availability: vehicle.availability,
          created_at: vehicle.createdAt,
          updated_at: vehicle.updatedAt,
        },
      };

      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get vehicle by driver id
  @Get('driver/:id')
  async getVehicleByDriverId(@Param('id') driverId: string) {
    try {
      const vehicle = await lastValueFrom(
        this.vehicleService.getVehicleByDriverId({ driverId }).pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const response: VehicleResponse = {
        code: '200',
        message: 'success',
        data: {
          vehicle_id: vehicle.vehicleId,
          driver_id: vehicle.driverId,
          vehicle_type: vehicle.vehicleType,
          brand_name: vehicle.brandName,
          model_name: vehicle.modelName,
          registration_number: vehicle.registrationNumber,
          color: vehicle.color,
          year: vehicle.year,
          insurance_number: vehicle.insuranceNumber,
          insurance_expiry: vehicle.insuranceExpiry,
          availability: vehicle.availability,
          created_at: vehicle.createdAt,
          updated_at: vehicle.updatedAt,
        },
      };

      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // update vehicle availability
  @Post('availability')
  async updateVehicleAvailability(@Body() updateVehicleAvailabilityDto: UpdateVehicleAvailabilityDto) {
    try {
      const vehicle = await lastValueFrom(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.vehicleService.updateVehicleAvailability(updateVehicleAvailabilityDto).pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const response: VehicleResponse = {
        code: '200',
        message: 'success',
        data: {
          vehicle_id: vehicle.vehicleId,
          driver_id: vehicle.driverId,
          vehicle_type: vehicle.vehicleType,
          brand_name: vehicle.brandName,
          model_name: vehicle.modelName,
          registration_number: vehicle.registrationNumber,
          color: vehicle.color,
          year: vehicle.year,
          insurance_number: vehicle.insuranceNumber,
          insurance_expiry: vehicle.insuranceExpiry,
          availability: vehicle.availability,
          created_at: vehicle.createdAt,
          updated_at: vehicle.updatedAt,
        },
      };

      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // delete vehicle
  @Delete()
  async deleteVehicle(@Body('id') vehicleId: string) {
    try {
      const vehicle = await lastValueFrom(
        this.vehicleService.deleteVehicle({ vehicleId }).pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const response: VehicleResponse = {
        code: '200',
        message: 'success',
        data: {
          vehicle_id: vehicle.vehicleId,
          driver_id: vehicle.driverId,
          vehicle_type: vehicle.vehicleType,
          brand_name: vehicle.brandName,
          model_name: vehicle.modelName,
          registration_number: vehicle.registrationNumber,
          color: vehicle.color,
          year: vehicle.year,
          insurance_number: vehicle.insuranceNumber,
          insurance_expiry: vehicle.insuranceExpiry,
          availability: vehicle.availability,
          created_at: vehicle.createdAt,
          updated_at: vehicle.updatedAt,
        },
      };

      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // updateVehicleLocation
  @Post('location')
  async updateVehicleLocation(@Body() vehicleLocation: VehicleLocation) {
    try {
      const vehicle = await lastValueFrom(
        this.vehicleService.updateVehicleLocation(vehicleLocation).pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const response: VehicleResponse = {
        code: '200',
        message: 'success',
        data: {
          tracking_id: vehicle.trackingId,
          vehicle_id: vehicle.vehicleId,
          latitude: vehicle.latitude,
          longitude: vehicle.longitude,
          updated_at: vehicle.updatedAt,
        },
      };

      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // findVehicleLocation ------------
  @Get('location/:id')
  async findVehicleLocation(@Param('id') vehicleId: string) {
    try {
      const vehicle = await lastValueFrom(
        this.vehicleService.findVehicleLocation({ vehicleId }).pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const response: VehicleResponse = {
        code: '200',
        message: 'success',
        data: {
          tracking_id: vehicle.trackingId,
          vehicle_id: vehicle.vehicleId,
          latitude: vehicle.latitude,
          longitude: vehicle.longitude,
          updated_at: vehicle.updatedAt,
        },
      };

      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //getAllVehicleLocations
  @Get('locations')
  async getAllVehicleLocations() {
    try {
      const vehicleList = await lastValueFrom(
        this.vehicleService.getAllVehicleLocations().pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const formattedVehicles = Array.isArray(vehicleList.vehicleId)
        ? vehicleList.vehicleId.map((v) => ({
            tracking_id: v.trackingId,
            vehicle_id: v.vehicleId,
            latitude: v.latitude,
            longitude: v.longitude,
            updated_at: v.updatedAt,
          }))
        : [];

      const response = successResponse('success', formattedVehicles);
      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // deleteVehicleLocation
  @Delete('location/:id')
  async deleteVehicleLocation(@Param('id') vehicleId: string) {
    try {
      const vehicle = await lastValueFrom(
        this.vehicleService.deleteVehicleLocation({ vehicleId }).pipe(
          catchError((err) => {
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
                    message: 'Internal server error',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      const response: VehicleResponse = {
        code: '200',
        message: 'success',
        data: {
          tracking_id: vehicle.trackingId,
          vehicle_id: vehicle.vehicleId,
          latitude: vehicle.latitude,
          longitude: vehicle.longitude,
          updated_at: vehicle.updatedAt,
        },
      };

      return response;
    } catch (err) {
      console.error('Caught Error:', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
