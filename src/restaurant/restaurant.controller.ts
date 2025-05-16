/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResponse } from './types/response';

import { catchError, lastValueFrom, throwError } from 'rxjs';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('accept-order')
  async acceptOrder(
    @Body() orderAcceptedDto: { orderId: string; restaurantId: string; location: { lat: string; lng: string } },
  ) {
    try {
      console.log('Accepting order with DTO:', orderAcceptedDto);
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
          restaurant_id: restaurant.restaurantId,
          user_id: restaurant.userId,
          restaurant_name: restaurant.name,
          address: restaurant.address,
          opening_hours: restaurant.openHours,
          cuisine_type: restaurant.cuisineType,
          location: restaurant.location,
          phone: restaurant.phone,
          description: restaurant.description,
          image_reference: restaurant.imageReference,
          number_of_ratings: restaurant.numberOfRatings,
          is_open: restaurant.isOpen,
          is_verified: restaurant.isVerified,
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
  async findAll() {
    console.log('Fetching all restaurants');
    try {
      const restaurantList = await lastValueFrom(this.restaurantService.findAllRestaurants());

      const formattedData = restaurantList.restaurants.map((restaurant) => ({
        restaurant_id: restaurant.restaurantId,
        user_id: restaurant.userId,
        restaurant_name: restaurant.name,
        address: restaurant.address,
        opening_hours: restaurant.openHours,
        cuisine_type: restaurant.cuisineType,
        location: restaurant.location,
        phone: restaurant.phone,
        description: restaurant.description,
        image_reference: restaurant.imageReference,
        number_of_ratings: restaurant.numberOfRatings,
        is_open: restaurant.isOpen,
        is_verified: restaurant.isVerified,
      }));

      return {
        code: '200',
        message: 'success',
        data: formattedData,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error('Error fetching all restaurants:', err);
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
  async findOne(@Param('id') restaurantId: string) {
    try {
      return lastValueFrom(this.restaurantService.findRestaurantById({ restaurantId })).then((restaurant) => {
        const response: RestaurantResponse = {
          code: '200',
          message: 'success',
          data: {
            restaurant_id: restaurant.restaurantId,
            user_id: restaurant.userId,
            restaurant_name: restaurant.name,
            address: restaurant.address,
            opening_hours: restaurant.openHours,
            location: restaurant.location,
            phone: restaurant.phone,
            description: restaurant.description,
            image_reference: restaurant.imageReference,
            number_of_ratings: restaurant.numberOfRatings,
            is_open: restaurant.isOpen,
            is_verified: restaurant.isVerified,
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
            restaurant_id: restaurant.restaurantId,
            user_id: restaurant.userId,
            restaurant_name: restaurant.name,
            address: restaurant.address,
            opening_hours: restaurant.openHours,
            location: restaurant.location,
            phone: restaurant.phone,
            description: restaurant.description,
            image_reference: restaurant.imageReference,
            number_of_ratings: restaurant.numberOfRatings,
            is_open: restaurant.isOpen,
            is_verified: restaurant.isVerified,
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
  async remove(@Param('id') restaurantId: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return lastValueFrom(this.restaurantService.deleteRestaurant({ restaurantId })).then((response) => {
        return {
          code: '200',
          message: 'success',
          data: {
            success: true, // Assuming the deletion is always successful; adjust based on actual logic
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
