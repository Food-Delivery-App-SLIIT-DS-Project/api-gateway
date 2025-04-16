/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserList, UserResponse } from './types';
import { VerifyOneUserDto } from './dto/verifyUser.dto';
import { FindAllUserByIsVerifiedDto } from './dto/findAllUserByIsVerified.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  // @Post()
  // async createUser(@Body() data: CreateUserDto): Promise<UserResponse> {
  //   console.log('createUser', data);
  //   return this.userService.createUser(data);
  // }

  // get all users
  @Get()
  async findAllUsers(): Promise<UserList> {
    console.log('getAllUsers');
    return this.userService.findAllUsers();
  }
  
  // Verify a user
  @Patch('verify')
  async verifyUser(@Body() data: VerifyOneUserDto): Promise<UserResponse> {
    console.log('verifyUser', data);
    return this.userService.verifyUser(data);
  }
  // find all customer-------------
  @Get('customer')
  async findAllCustomers(): Promise<UserList> {
    console.log('getAllCustomer');
    return this.userService.findAllCustomers();
  }

  // find all delivery personnel-------------
  @Get('delivery_personnel')
  async findAllDeliveryPersonnel(): Promise<UserList> {
    console.log('getAllDeliveryPersonnel');
    return this.userService.findAllDeliveryPersonnel();
  }
  // find all restaurants-------------
  @Get('restaurant')
  async findAllRestaurants(): Promise<UserList> {
    console.log('getAllRestaurants');
    return this.userService.findAllRestaurants();
  }
  // find all users by isVerified-------------
  @Get('isVerified')
  async findAllUserByIsVerified(@Body() data: FindAllUserByIsVerifiedDto): Promise<UserList> {
    console.log('getAllUsersByIsVerified');
    return this.userService.findAllUserByIsVerified(data);
  }
  // find all customers by isVerified-------------
  @Get('customer/isVerified')
  async findAllCustomerByIsVerified(@Body() data: FindAllUserByIsVerifiedDto): Promise<UserList> {
    console.log('getAllCustomersByIsVerified');
    return this.userService.findAllCustomerByIsVerified(data);
  }
  // find all delivery personnel by isVerified-------------
  @Get('delivery_personnel/isVerified')
  async findAllDeliveryPersonnelByIsVerified(@Body() data: FindAllUserByIsVerifiedDto): Promise<UserList> {
    console.log('getAllDeliveryPersonnelByIsVerified');
    return this.userService.findAllDeliveryPersonnelByIsVerified(data);
  }
  // find all restaurants by isVerified-------------
  @Get('restaurant/isVerified')
  async findAllRestaurantByIsVerified(@Body() data: FindAllUserByIsVerifiedDto): Promise<UserList> {
    console.log('getAllRestaurantsByIsVerified');
    return this.userService.findAllRestaurantByIsVerified(data);
  }

  // Find a user by ID
  @Get(':id')
  findOneUser(@Param('id') user_id: string):Promise <UserResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.userService.findUserById({ userId: user_id });
  }
  // Update a user
  @Put(':id')
  async updateUser(@Param('id') user_id: string, @Body() data: UpdateUserDto): Promise<UserResponse> {
    console.log('updateUser', data);
    return this.userService.updateUser(data);
  }
  // Delete a user
  @Delete(':id')
  async deleteUser(@Param('id') user_id: string): Promise<UserResponse> {
    console.log('deleteUser', user_id);
    return this.userService.deleteUser({ userId: user_id });
  }
}
