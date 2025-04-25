/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  OrderAcceptedDto,
  OrderAcceptedResponse,
  RESTAURANT_SERVICE_NAME,
  RestaurantId,
  RestaurantList,
  RestaurantResponse,
  RestaurantServiceClient,
} from './types/restaurant';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService implements OnModuleInit {
  private restaurantServiceClient: RestaurantServiceClient;
  constructor(@Inject(RESTAURANT_SERVICE_NAME) private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.restaurantServiceClient = this.client.getService<RestaurantServiceClient>(RESTAURANT_SERVICE_NAME);
  }
  // ----------- Restaurant Service -----------
  restaurantAcceptOrder(request: OrderAcceptedDto): Observable<OrderAcceptedResponse> {
    return this.restaurantServiceClient.restaurantOrderAcceptOrReject(request);
  }
  // ----------- Restaurant Service -----------
  createRestaurant(request: CreateRestaurantDto) {
    return this.restaurantServiceClient.createRestaurant(request);
  }
  findRestaurantById(request: RestaurantId): Observable<RestaurantResponse> {
    return this.restaurantServiceClient.getRestaurant(request);
  }
  findAllRestaurants(): Observable<RestaurantList> {
    return this.restaurantServiceClient.getAllRestaurants({});
  }
  updateRestaurant(request: UpdateRestaurantDto): Observable<RestaurantResponse> {
    return this.restaurantServiceClient.updateRestaurant(request);
  }
  deleteRestaurant(request: RestaurantId) {
    return this.restaurantServiceClient.deleteRestaurant(request);
  }
}
