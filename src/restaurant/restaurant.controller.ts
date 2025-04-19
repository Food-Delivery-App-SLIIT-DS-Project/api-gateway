/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './types/restaurant';
import { RestaurantResponse } from './types/response';

import { catchError, lastValueFrom, throwError } from 'rxjs';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('accept-order')
  async acceptOrder(@Body() orderAcceptedDto: { orderId: string; restaurantId: string; location: { lat: string; lng: string } }) {
    try {
      console.log("Accepting order with DTO:", orderAcceptedDto);
      const response = await lastValueFrom(this.restaurantService.restaurantAcceptOrder(orderAcceptedDto));
      return {
        code: '200',
        message: 'success',
        data: {
          status: response.status,
        },
      };
    } catch (err) {
      console.error('Error accepting order:', err);
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    try {
      const restaurant = await lastValueFrom(
        this.restaurantService.createRestaurant(createRestaurantDto).pipe(
          catchError((err) => {
            // Optional: log the gRPC error
            console.error('gRPC Error:', err);

            // Map gRPC error to HTTP error
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

      const response: RestaurantResponse = {
        code: '200',
        message: 'success',
        data: {
          restaurant_id: restaurant.id,
          user_id: restaurant.userId,
          restaurant_name: restaurant.restaurantName,
          address: restaurant.address,
          opening_hours: restaurant.openingHours,
          cuisine_type: restaurant.cuisineType,
        },
      };

      return response;
    } catch (err) {
      // Handle the exception thrown by throwError above
      console.error('Caught Error:', err);

      if (err instanceof HttpException) {
        throw err; // Let NestJS handle it
      }

      throw new HttpException(
        {
          code: '500',
          message: 'Unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<
    RestaurantResponse<
      {
        restaurant_id: string;
        user_id: string;
        restaurant_name: string;
        address: string;
        opening_hours: string;
        cuisine_type: string;
      }[]
    >
  > {
    try {
      const restaurantList = await lastValueFrom(this.restaurantService.findAllRestaurants({}));

      const formattedData = restaurantList.restaurants.map((restaurant) => ({
        restaurant_id: restaurant.id,
        user_id: restaurant.userId,
        restaurant_name: restaurant.restaurantName,
        address: restaurant.address,
        opening_hours: restaurant.openingHours,
        cuisine_type: restaurant.cuisineType,
      }));

      return {
        code: '200',
        message: 'success',
        data: formattedData,
      };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
          data: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return lastValueFrom(this.restaurantService.findRestaurantById({ id })).then((restaurant) => {
        const response: RestaurantResponse = {
          code: '200',
          message: 'success',
          data: {
            restaurant_id: restaurant.id,
            user_id: restaurant.userId,
            restaurant_name: restaurant.restaurantName,
            address: restaurant.address,
            opening_hours: restaurant.openingHours,
            cuisine_type: restaurant.cuisineType,
          },
        };
        return response;
      });
    } catch (err) {
      console.error('Error fetching restaurant:', err);
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Body() updateRestaurantDto: UpdateRestaurantDto) {
    try {
      return lastValueFrom(this.restaurantService.updateRestaurant(updateRestaurantDto)).then((restaurant) => {
        const response: RestaurantResponse = {
          code: '200',
          message: 'success',
          data: {
            restaurant_id: restaurant.id,
            user_id: restaurant.userId,
            restaurant_name: restaurant.restaurantName,
            address: restaurant.address,
            opening_hours: restaurant.openingHours,
            cuisine_type: restaurant.cuisineType,
          },
        };
        return response;
      });
    } catch (err) {
      console.error('Error updating restaurant:', err);
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return lastValueFrom(this.restaurantService.deleteRestaurant({ id })).then((response) => {
        return {
          code: '200',
          message: 'success',
          data: {
            success: response.success,
          },
        };
      });
    } catch (err) {
      console.error('Error deleting restaurant:', err);
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
