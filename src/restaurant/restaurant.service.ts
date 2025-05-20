/* eslint-disable prettier/prettier */
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
  NameRequest,
  CuisineRequest,
  UserIdRequest,
  UpdateIsVerifiedRequest,
  UpdateIsOpenRequest,
  LocationRequest,
  RatingIncrease,
} from './types/restaurant';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Empty } from 'src/user/types';

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

  // ----------- New Functions -----------

  // Get restaurant by name
  findRestaurantByName(request: NameRequest): Observable<RestaurantResponse> {
    return this.restaurantServiceClient.getRestaurantByName(request);
  }

  // Get restaurants by cuisine type
  findRestaurantsByCuisine(request: CuisineRequest): Observable<RestaurantList> {
    return this.restaurantServiceClient.getRestaurantsByCuisine(request);
  }

  // Get restaurants by user ID
  findRestaurantsByUserId(request: UserIdRequest): Observable<RestaurantList> {
    return this.restaurantServiceClient.getRestaurantsByUserId(request);
  }

  // Update restaurant verification status
  updateRestaurantVerificationStatus(request: UpdateIsVerifiedRequest): Observable<RestaurantResponse> {
    return this.restaurantServiceClient.updateIsVerified(request);
  }

  // Update restaurant open status
  updateRestaurantOpenStatus(request: UpdateIsOpenRequest): Observable<RestaurantResponse> {
    return this.restaurantServiceClient.updateIsOpen(request);
  }

  // Get restaurants by location
  findRestaurantsByLocation(request: LocationRequest): Observable<RestaurantList> {
    return this.restaurantServiceClient.getRestaurantsByLocation(request);
  }

  // Update restaurant rating
  updateRestaurantRating(request: RatingIncrease): Observable<Empty> {
    return this.restaurantServiceClient.updateRating(request);
  }
}
