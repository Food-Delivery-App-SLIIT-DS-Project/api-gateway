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

  //--- new -----------------
  @Get('by-name/:name')
async getByName(@Param('name') name: string) {
  try {
    const restaurant = await lastValueFrom(this.restaurantService.getRestaurantByName({ name }));
    return {
      code: '200',
      message: 'success',
      data: restaurant,
    };
  } catch (err) {
    console.error('Error fetching by name:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Get('by-cuisine/:cuisine')
async getByCuisine(@Param('cuisine') cuisine: string) {
  try {
    const list = await lastValueFrom(this.restaurantService.getRestaurantsByCuisine({ cuisine }));
    return { code: '200', message: 'success', data: list.restaurants };
  } catch (err) {
    console.error('Error fetching by cuisine:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Get('by-user/:userId')
async getByUser(@Param('userId') userId: string) {
  try {
    const list = await lastValueFrom(this.restaurantService.getRestaurantsByUserId({ userId }));
    return { code: '200', message: 'success', data: list.restaurants };
  } catch (err) {
    console.error('Error fetching by user ID:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Patch('verify/:id')
async updateIsVerified(@Param('id') id: string, @Body() body: { isVerified: boolean }) {
  try {
    const updated = await lastValueFrom(this.restaurantService.updateIsVerified({ restaurantId: id, isVerified: body.isVerified }));
    return { code: '200', message: 'success', data: updated };
  } catch (err) {
    console.error('Error updating verification:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Patch('open/:id')
async updateIsOpen(@Param('id') id: string, @Body() body: { isOpen: boolean }) {
  try {
    const updated = await lastValueFrom(this.restaurantService.updateIsOpen({ restaurantId: id, isOpen: body.isOpen }));
    return { code: '200', message: 'success', data: updated };
  } catch (err) {
    console.error('Error updating open status:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Get('by-location')
async getByLocation(@Body() body: { latitude: number; longitude: number; radius: number }) {
  try {
    const list = await lastValueFrom(this.restaurantService.getRestaurantsByLocation(body));
    return { code: '200', message: 'success', data: list.restaurants };
  } catch (err) {
    console.error('Error fetching by location:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Get('with-filters')
async getWithFilters() {
  try {
    const list = await lastValueFrom(this.restaurantService.getAllRestaurantsWithFilters());
    return { code: '200', message: 'success', data: list.restaurants };
  } catch (err) {
    console.error('Error fetching with filters:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Patch('increase-rating/:id')
async increaseRating(@Param('id') restaurantId: string) {
  try {
    await lastValueFrom(this.restaurantService.increaseRating({ restaurantId }));
    return { code: '200', message: 'Rating increased', data: {} };
  } catch (err) {
    console.error('Error increasing rating:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Patch('decrease-rating/:id')
async decreaseRating(@Param('id') restaurantId: string) {
  try {
    await lastValueFrom(this.restaurantService.decreaseRating({ restaurantId }));
    return { code: '200', message: 'Rating decreased', data: {} };
  } catch (err) {
    console.error('Error decreasing rating:', err);
    throw new HttpException({ code: '500', message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

}
