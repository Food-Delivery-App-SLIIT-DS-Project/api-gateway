import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './types/restaurant';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // Create a new restaurant
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  // Get a single restaurant by ID
  @Get(':id')
  async getRestaurant(@Param('id') restaurantId: string): Promise<Restaurant> {
    return this.restaurantService.getRestaurant(restaurantId);
  }

  // Get all restaurants
  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    const restaurantList = await this.restaurantService.getAllRestaurants();
    console.log('Get all restaurants: Working');
    return restaurantList.restaurants;
  }

  // Get all restaurants with filters (if any)
  @Get('filters')
  async getAllRestaurantsWithFilters(): Promise<Restaurant[]> {
    const restaurantList = await this.restaurantService.getAllRestaurantsWithFilters();
    return restaurantList.restaurants;
  }

  // Update a restaurant
  @Put(':id')
  async update(
    @Param('id') restaurantId: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    // Optionally, you can include restaurantId in the DTO
    updateRestaurantDto.restaurantId = restaurantId;
    return this.restaurantService.updateRestaurant(updateRestaurantDto);
  }

  // Delete a restaurant by ID
  @Delete(':id')
  async delete(@Param('id') restaurantId: string): Promise<void> {
    await this.restaurantService.deleteRestaurant(restaurantId);
  }

  // Get restaurants by name
  @Get('name/:name')
  async getRestaurantByName(@Param('name') name: string): Promise<Restaurant> {
    return this.restaurantService.getRestaurantByName(name);
  }

  // Get restaurants by cuisine type
  @Get('cuisine/:cuisine')
  async getRestaurantsByCuisine(@Param('cuisine') cuisine: string): Promise<Restaurant[]> {
    const restaurantList = await this.restaurantService.getRestaurantsByCuisine(cuisine);
    return restaurantList.restaurants;
  }

  // Get restaurants by user ID
  @Get('user/:userId')
  async getRestaurantsByUserId(@Param('userId') userId: string): Promise<Restaurant[]> {
    const restaurantList = await this.restaurantService.getRestaurantsByUserId(userId);
    return restaurantList.restaurants;
  }

  // Update restaurant verified status
  @Put(':id/verify')
  async updateIsVerified(@Param('id') restaurantId: string, @Body('isVerified') isVerified: boolean): Promise<void> {
    await this.restaurantService.updateIsVerified(restaurantId, isVerified);
  }

  // Update restaurant open status
  @Put(':id/open')
  async updateIsOpen(@Param('id') restaurantId: string, @Body('isOpen') isOpen: boolean): Promise<void> {
    await this.restaurantService.updateIsOpen(restaurantId, isOpen);
  }

  // Get restaurants by rating
  @Get('rating')
  async getRestaurantsByRating(@Query('rating') rating: number): Promise<Restaurant[]> {
    const restaurantList = await this.restaurantService.getRestaurantsByRating(rating);
    return restaurantList.restaurants;
  }

  // Get restaurants by location (latitude, longitude, radius)
  @Get('location')
  async getRestaurantsByLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ): Promise<Restaurant[]> {
    const restaurantList = await this.restaurantService.getRestaurantsByLocation(latitude, longitude, radius);
    return restaurantList.restaurants;
  }
}
