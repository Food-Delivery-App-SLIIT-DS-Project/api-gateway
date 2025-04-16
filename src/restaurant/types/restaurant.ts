// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v6.30.2
// source: proto/restaurant.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "restaurant";

export interface Empty {
}

export interface FindOneDto {
  id: string;
}

export interface CreateRestaurantDto {
  userId: string;
  restaurantName: string;
  address: string;
  openingHours: string;
  cuisineType: string;
}

export interface UpdateRestaurantDto {
  id: string;
  restaurantName: string;
  address: string;
  openingHours: string;
  cuisineType: string;
}

export interface RestaurantResponse {
  id: string;
  userId: string;
  restaurantName: string;
  address: string;
  openingHours: string;
  cuisineType: string;
  createdAt?: Date; // Add createdAt field
  updatedAt?: Date; // Add updatedAt field
}

export interface RestaurantList {
  restaurants: RestaurantResponse[];
}

export interface DeleteResponse {
  success: boolean;
}

export const RESTAURANT_PACKAGE_NAME = "restaurant";

export interface RestaurantServiceClient {
  createRestaurant(request: CreateRestaurantDto): Observable<RestaurantResponse>;

  findRestaurantById(request: FindOneDto): Observable<RestaurantResponse>;

  findAllRestaurants(request: Empty): Observable<RestaurantList>;

  updateRestaurant(request: UpdateRestaurantDto): Observable<RestaurantResponse>;

  deleteRestaurant(request: FindOneDto): Observable<DeleteResponse>;
}

export interface RestaurantServiceController {
  createRestaurant(
    request: CreateRestaurantDto,
  ): Promise<RestaurantResponse> | Observable<RestaurantResponse> | RestaurantResponse;

  findRestaurantById(
    request: FindOneDto,
  ): Promise<RestaurantResponse> | Observable<RestaurantResponse> | RestaurantResponse;

  findAllRestaurants(request: Empty): Promise<RestaurantList> | Observable<RestaurantList> | RestaurantList;

  updateRestaurant(
    request: UpdateRestaurantDto,
  ): Promise<RestaurantResponse> | Observable<RestaurantResponse> | RestaurantResponse;

  deleteRestaurant(request: FindOneDto): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function RestaurantServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createRestaurant",
      "findRestaurantById",
      "findAllRestaurants",
      "updateRestaurant",
      "deleteRestaurant",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RestaurantService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RestaurantService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RESTAURANT_SERVICE_NAME = "RestaurantService";
