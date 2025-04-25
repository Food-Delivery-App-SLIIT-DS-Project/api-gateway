import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResponse, RestaurantList } from './types/restaurant';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async createRestaurant(
    @Body()
    body: {
      userId: string;
      name: string;
      address: string;
      latitude: number;
      longitude: number;
      phone: string;
      cuisineType: string;
      description: string;
      openHours: string;
      imageReference: string;
    },
  ): Promise<RestaurantResponse> {
    return this.restaurantService.createRestaurant(
      body.userId,
      body.name,
      body.address,
      body.latitude,
      body.longitude,
      body.phone,
      body.cuisineType,
      body.description,
      body.openHours,
      body.imageReference,
    );
  }

  @Get()
  async getAllRestaurants(): Promise<RestaurantList> {
    return this.restaurantService.getAllRestaurants();
  }

  @Get('filters')
  async getAllRestaurantsWithFilters(): Promise<RestaurantList> {
    return this.restaurantService.getAllRestaurantsWithFilters();
  }

  @Get('by-name/:name')
  async getRestaurantByName(@Param('name') name: string): Promise<RestaurantResponse> {
    return this.restaurantService.getRestaurantByName(name);
  }

  @Get('by-cuisine/:cuisine')
  async getRestaurantsByCuisine(@Param('cuisine') cuisine: string): Promise<RestaurantList> {
    return this.restaurantService.getRestaurantsByCuisine(cuisine);
  }

  @Get('by-user/:userId')
  async getRestaurantsByUserId(@Param('userId') userId: string): Promise<RestaurantList> {
    return this.restaurantService.getRestaurantsByUserId(userId);
  }

  @Get('by-location')
  async getRestaurantsByLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ): Promise<RestaurantList> {
    return this.restaurantService.getRestaurantsByLocation(Number(latitude), Number(longitude), Number(radius));
  }

  @Get(':id')
  async getRestaurant(@Param('id') restaurantId: string): Promise<RestaurantResponse> {
    return this.restaurantService.getRestaurant(restaurantId);
  }

  @Patch(':id')
  async updateRestaurant(
    @Param('id') restaurantId: string,
    @Body()
    body: {
      name: string;
      address: string;
      latitude: number;
      longitude: number;
      phone: string;
      cuisineType: string;
      description: string;
      openHours: string;
      imageReference: string;
      isOpen: boolean;
      isVerified: boolean;
    },
  ): Promise<RestaurantResponse> {
    return this.restaurantService.updateRestaurant(
      restaurantId,
      body.name,
      body.address,
      body.latitude,
      body.longitude,
      body.phone,
      body.cuisineType,
      body.description,
      body.openHours,
      body.imageReference,
      body.isOpen,
      body.isVerified,
    );
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') restaurantId: string) {
    return this.restaurantService.deleteRestaurant(restaurantId);
  }

  @Patch(':id/verify')
  async updateIsVerified(
    @Param('id') restaurantId: string,
    @Body('isVerified') isVerified: boolean,
  ): Promise<RestaurantResponse> {
    return this.restaurantService.updateIsVerified(restaurantId, isVerified);
  }

  @Patch(':id/open')
  async updateIsOpen(@Param('id') restaurantId: string, @Body('isOpen') isOpen: boolean): Promise<RestaurantResponse> {
    return this.restaurantService.updateIsOpen(restaurantId, isOpen);
  }

  @Patch(':id/rating/increase')
  async updateRating(@Param('id') restaurantId: string) {
    return this.restaurantService.updateRating(restaurantId);
  }

  @Patch(':id/rating/decrease')
  async decreaseRating(@Param('id') restaurantId: string) {
    return this.restaurantService.decreaseRating(restaurantId);
  }
}
