/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  UserServiceClient,
  USER_SERVICE_NAME,
  CreateUserDto,
  FineOneUserDto,
  UpdateUserDto,
  UserList,
  UserResponse,
} from './types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    console.log("hello");
    return lastValueFrom(this.userServiceClient.createUser(dto));
  }

  async findAllUsers(): Promise<UserList> {
    return lastValueFrom(this.userServiceClient.findAllUsers({}));
  }

  async findUserById(dto: FineOneUserDto): Promise<UserResponse> {
    return lastValueFrom(this.userServiceClient.findUserById(dto));
  }

  async updateUser(dto: UpdateUserDto): Promise<UserResponse> {
    return lastValueFrom(this.userServiceClient.updateUser(dto));
  }

  async deleteUser(dto: FineOneUserDto): Promise<UserResponse> {
    return lastValueFrom(this.userServiceClient.deleteUser(dto));
  }
}
