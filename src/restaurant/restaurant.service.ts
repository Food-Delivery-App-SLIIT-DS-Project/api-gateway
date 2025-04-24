/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import {
  RESTAURANT_SERVICE_NAME,
  RestaurantServiceClient,
  Restaurant,
  RestaurantList,
  RestaurantResponse,
} from './types/restaurant';
import { lastValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { Empty } from 'google/protobuf/empty';

@Injectable()
export class RestaurantService implements OnModuleInit {
  private restaurantServiceClient: RestaurantServiceClient;

  constructor(@Inject(RESTAURANT_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.restaurantServiceClient = this.client.getService<RestaurantServiceClient>(RESTAURANT_SERVICE_NAME);
  }

  async createRestaurant(dto: CreateRestaurantDto): Promise<Restaurant> {
    return lastValueFrom(this.restaurantServiceClient.createRestaurant(dto));
  }

  async getRestaurant(restaurantId: string): Promise<Restaurant> {
    return lastValueFrom(this.restaurantServiceClient.getRestaurant({ restaurantId }));
  }

  async getAllRestaurants(): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getAllRestaurants({}));
  }

  async updateRestaurant(dto: UpdateRestaurantDto): Promise<Restaurant> {
    return lastValueFrom(this.restaurantServiceClient.updateRestaurant(dto));
  }

  async deleteRestaurant(restaurantId: string): Promise<Empty> {
    return lastValueFrom(this.restaurantServiceClient.deleteRestaurant({ restaurantId }));
  }

  async getRestaurantByName(name: string): Promise<Restaurant> {
    return lastValueFrom(this.restaurantServiceClient.getRestaurantByName({ name }));
  }

  async getRestaurantsByCuisine(cuisine: string): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getRestaurantsByCuisine({ cuisine }));
  }

  async getRestaurantsByUserId(userId: string): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getRestaurantsByUserId({ userId }));
  }

  async updateIsVerified(restaurantId: string, isVerified: boolean): Promise<RestaurantResponse> {
    return lastValueFrom(this.restaurantServiceClient.updateIsVerified({ restaurantId, isVerified }));
  }

  async updateIsOpen(restaurantId: string, isOpen: boolean): Promise<RestaurantResponse> {
    return lastValueFrom(this.restaurantServiceClient.updateIsOpen({ restaurantId, isOpen }));
  }

  async getRestaurantsByRating(rating: number): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getRestaurantsByRating({ rating }));
  }

  async getRestaurantsByLocation(latitude: number, longitude: number, radius: number): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getRestaurantsByLocation({ latitude, longitude, radius }));
  }

  async getAllRestaurantsWithFilters(): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getAllRestaurantsWithFilters({}));
  }
}
