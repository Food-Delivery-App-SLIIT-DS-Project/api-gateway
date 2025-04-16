/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './types/restaurant';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAllRestaurants({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findRestaurantById({ id });
  }

  @Patch(':id')
  update(@Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.updateRestaurant(updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurant({ id });
  }
}
