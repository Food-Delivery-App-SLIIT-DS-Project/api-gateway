/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserList, UserResponse } from './types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    console.log('user controller createUser');
    return this.userService.createUser(dto);
  }

  @Get()
  async findAllUsers(): Promise<UserList> {
    console.log('findAllUsers');
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.findUserById({ id });
  }

  // @Put(':id')
  // async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserResponse> {
  //   const { userId: _, ...restDto } = dto;
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   return this.userService.updateUser({ userId, ...restDto });
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<User> {
  //   return this.userService.deleteUser({ id });
  // }
}
