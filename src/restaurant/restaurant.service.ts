/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateRestaurantDto,
  DeleteResponse,
  Empty,
  FindOneDto,
  OrderAcceptedDto,
  OrderAcceptedResponse,
  RESTAURANT_SERVICE_NAME,
  RestaurantList,
  RestaurantResponse,
  RestaurantServiceClient,
  UpdateRestaurantDto,
} from './types/restaurant';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class RestaurantService implements OnModuleInit {
  private restaurantServiceClient: RestaurantServiceClient;
  constructor(@Inject(RESTAURANT_SERVICE_NAME) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.restaurantServiceClient = this.client.getService<RestaurantServiceClient>(RESTAURANT_SERVICE_NAME);
  }
  // ----------- Restaurant Service -----------
  restaurantAcceptOrder(request: OrderAcceptedDto): Observable<OrderAcceptedResponse> {
    return this.restaurantServiceClient.restaurantAcceptOrder(request);
  }
  // ----------- Restaurant Service -----------
  createRestaurant(request: CreateRestaurantDto) {
    return this.restaurantServiceClient.createRestaurant(request);
  }
  findRestaurantById(request: FindOneDto): Observable<RestaurantResponse> {
    return this.restaurantServiceClient.findRestaurantById(request);
  }
  findAllRestaurants(request: Empty): Observable<RestaurantList> {
    return this.client.getService<RestaurantServiceClient>(RESTAURANT_SERVICE_NAME).findAllRestaurants(request);
  }
  updateRestaurant(request: UpdateRestaurantDto): Observable<RestaurantResponse> {
    return this.restaurantServiceClient.updateRestaurant(request);
  }
  deleteRestaurant(request: FindOneDto): Observable<DeleteResponse> {
    return this.restaurantServiceClient.deleteRestaurant(request);
  }
}
