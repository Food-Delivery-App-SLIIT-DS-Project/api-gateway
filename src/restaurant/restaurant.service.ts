/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  RESTAURANT_SERVICE_NAME,
  RestaurantServiceClient,
  RestaurantList,
  RestaurantResponse,
  RestaurantId,
} from './types/restaurant';
import { lastValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { Empty } from 'google/protobuf/empty';

@Injectable()
export class RestaurantService implements OnModuleInit {
  private restaurantServiceClient: RestaurantServiceClient;

  constructor(@Inject('RESTAURANT_SERVICE_NAME') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.restaurantServiceClient = this.client.getService<RestaurantServiceClient>(RESTAURANT_SERVICE_NAME);
  }

  async createRestaurant(
    userId: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    phone: string,
    cuisineType: string,
    description: string,
    openHours: string,
    imageReference: string,
  ): Promise<RestaurantResponse> {
    const request = {
      userId,
      name,
      address,
      location: { latitude, longitude },
      phone,
      cuisineType,
      description,
      openHours,
      imageReference,
    };
    return lastValueFrom(this.restaurantServiceClient.createRestaurant(request));
  }

  async getRestaurant(restaurantId: string): Promise<RestaurantResponse> {
    return lastValueFrom(this.restaurantServiceClient.getRestaurant({ restaurantId }));
  }

  async getAllRestaurants(): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getAllRestaurants({}));
  }

  async updateRestaurant(
    restaurantId: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    phone: string,
    cuisineType: string,
    description: string,
    openHours: string,
    imageReference: string,
    isOpen: boolean,
    isVerified: boolean,
  ): Promise<RestaurantResponse> {
    const request = {
      restaurantId,
      name,
      address,
      location: { latitude, longitude },
      phone,
      cuisineType,
      description,
      openHours,
      imageReference,
      isOpen,
      isVerified,
    };
    return lastValueFrom(this.restaurantServiceClient.updateRestaurant(request));
  }

  async deleteRestaurant(restaurantId: string): Promise<Empty> {
    return lastValueFrom(this.restaurantServiceClient.deleteRestaurant({ restaurantId }));
  }

  async getRestaurantByName(name: string): Promise<RestaurantResponse> {
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

  async getRestaurantsByLocation(latitude: number, longitude: number, radius: number): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getRestaurantsByLocation({ latitude, longitude, radius }));
  }

  async getAllRestaurantsWithFilters(): Promise<RestaurantList> {
    return lastValueFrom(this.restaurantServiceClient.getAllRestaurantsWithFilters({}));
  }

  async updateRating(restaurantId: string): Promise<Empty> {
    return lastValueFrom(this.restaurantServiceClient.updateRating({ restaurantId }));
  }

  async decreaseRating(restaurantId: string): Promise<Empty> {
    return lastValueFrom(this.restaurantServiceClient.decreaseRating({ restaurantId }));
  }
}
