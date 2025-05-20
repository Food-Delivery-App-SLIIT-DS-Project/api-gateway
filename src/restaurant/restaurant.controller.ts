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
import { UpdateIsVerifiedRequest } from './types/restaurant';
import { RatingIncrease } from './types/restaurant';

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
            console.error('gRPC Error:', err);
            return throwError(
              () =>
                new HttpException(
                  {
                    code: '500',
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
      console.error('Caught Error:', err);
      if (err instanceof HttpException) {
        throw err;
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
      return lastValueFrom(this.restaurantService.deleteRestaurant({ restaurantId })).then((response) => {
        return {
          code: '200',
          message: 'success',
          data: {
            success: true,
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

  // ----------- New API Endpoints -----------

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    try {
      const restaurant = await lastValueFrom(this.restaurantService.findRestaurantByName({ name }));
      return {
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
    } catch (err) {
      throw new HttpException(
        {
          code: '500',
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('cuisine/:cuisine')
  async findByCuisine(@Param('cuisine') cuisine: string) {
    try {
      const restaurants = await lastValueFrom(this.restaurantService.findRestaurantsByCuisine({ cuisine }));
      const formattedData = restaurants.restaurants.map((restaurant) => ({
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

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    try {
      const restaurants = await lastValueFrom(this.restaurantService.findRestaurantsByUserId({ userId }));
      const formattedData = restaurants.restaurants.map((restaurant) => ({
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

  @Patch(':id/verification')
    async updateVerificationStatus(
      @Param('id') restaurantId: string, 
      @Body() updateIsVerifiedRequest: { isVerified: boolean }
    ) {
      try {
        const request = { 
          restaurantId, 
          isVerified: updateIsVerifiedRequest.isVerified 
        };
        const restaurant = await lastValueFrom(this.restaurantService.updateRestaurantVerificationStatus(request));
        return {
          code: '200',
          message: 'success',
          data: restaurant,
        };
      } catch (err) {
        throw new HttpException(
          {
            code: '500',
            message: 'Internal server error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Patch(':id/open-status')
    async updateOpenStatus(
      @Param('id') restaurantId: string, 
      @Body() updateIsOpenRequest: { isOpen: boolean }
    ) {
      try {
        const request = { 
          restaurantId, 
          isOpen: updateIsOpenRequest.isOpen 
        };
        const restaurant = await lastValueFrom(this.restaurantService.updateRestaurantOpenStatus(request));
        return {
          code: '200',
          message: 'success',
          data: restaurant,
        };
      } catch (err) {
        throw new HttpException(
          {
            code: '500',
            message: 'Internal server error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

  @Patch(':id/rating')
  async updateRating(@Param('id') restaurantId: string, @Body() ratingIncrease: RatingIncrease) {
    try {
      const response = await lastValueFrom(this.restaurantService.updateRestaurantRating(ratingIncrease));
      return {
        code: '200',
        message: 'success',
        data: response,
      };
    } catch (err) {
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
