/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  UserServiceClient,
  USER_SERVICE_NAME,
  CreateUserDto,
  FineOneUserDto,
  UpdateUserDto,
  UserList,
  UserResponse,
  VerifyOneUserDto,
  Status,
} from './types';
import { lastValueFrom } from 'rxjs';
import { status } from '@grpc/grpc-js';

@Injectable()
export class UserService implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  // create user -------------------
  async createUser(data: CreateUserDto): Promise<UserResponse> {
    console.log('createUser', data);
    const result = this.userServiceClient.createUser(data);
    return lastValueFrom(result);
  }
  // find user by email -----------------------
  async findUserByEmail(email: string): Promise<UserResponse> {
    console.log('findUserByEmail', email);
    const result = this.userServiceClient.findUserByEmail({ email });
    return lastValueFrom(result);
  }

  // find all users -----------------------
  async findAllUsers(): Promise<UserList> {
    try {
      const result$ = this.userServiceClient.findAllUsers({});
      return await lastValueFrom(result$);
    } catch (error: any) {
      console.error('gRPC findAllUsers error', error);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }
  // find one user -----------------------
  async findUserById(dto: FineOneUserDto): Promise<UserResponse> {
    try {
      const user$ = this.userServiceClient.findUserById(dto);
      return await lastValueFrom(user$);
    } catch (error: any) {
      //  gRPC errors handled here
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === status.NOT_FOUND) {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  // update user -----------------------
  async updateUser(data: UpdateUserDto): Promise<UserResponse> {
    console.log('updateUser', data);
    const result = this.userServiceClient.updateUser(data);
    return lastValueFrom(result);
  }
  // delete user -----------------------
  async deleteUser(data: FineOneUserDto): Promise<UserResponse> {
    console.log('deleteUser', data);
    const result = this.userServiceClient.deleteUser(data);
    return lastValueFrom(result);
  }
  // verify user -----------------------
  async verifyUser(data: VerifyOneUserDto): Promise<UserResponse> {
    console.log('verifyUser', data);
    const result = this.userServiceClient.verifyUser(data);
    return lastValueFrom(result);
  }

  // find all customers -----------------------
  async findAllCustomers(): Promise<UserList> {
    console.log('findAllCustomers');
    const result = this.userServiceClient.findAllCustomers({});
    return lastValueFrom(result);
  }
  // find all delivery personnel -----------------------
  async findAllDeliveryPersonnel(): Promise<UserList> {
    console.log('findAllDeliveryPersonnel');
    const result = this.userServiceClient.findAllDeliveryPersonnel({});
    return lastValueFrom(result);
  }
  // find all restaurants -----------------------
  async findAllRestaurants(): Promise<UserList> {
    console.log('findAllRestaurants');
    const result = this.userServiceClient.findAllRestaurants({});
    return lastValueFrom(result);
  }
  // find all users by isVerified -----------------------
  async findAllUserByIsVerified(data: Status): Promise<UserList> {
    console.log('findAllUserByIsVerified', data);
    const result = this.userServiceClient.findAllUserByIsVerified(data);
    return lastValueFrom(result);
  }
  // find all customers by isVerified -----------------------
  async findAllCustomerByIsVerified(data: Status): Promise<UserList> {
    console.log('findAllCustomerByIsVerified', data);
    const result = this.userServiceClient.findAllCustomerByIsVerified(data);
    return lastValueFrom(result);
  }
  // find all delivery personnel by isVerified -----------------------
  async findAllDeliveryPersonnelByIsVerified(data: Status): Promise<UserList> {
    console.log('findAllDeliveryPersonnelByIsVerified', data);
    const result = this.userServiceClient.findAllDeliveryPersonnelByIsVerified(data);
    return lastValueFrom(result);
  }
  // find all restaurants by isVerified -----------------------
  async findAllRestaurantByIsVerified(data: Status): Promise<UserList> {
    console.log('findAllRestaurantByIsVerified', data);
    const result = this.userServiceClient.findAllRestaurantByIsVerified(data);
    return lastValueFrom(result);
  }
}
