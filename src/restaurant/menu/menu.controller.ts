/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MenuService } from './menu.service';
import { lastValueFrom } from 'rxjs';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: any) {
    try {
      const menu = await lastValueFrom(this.menuService.createMenu(createMenuDto));
      return {
        code: '200',
        message: 'success',
        data: menu,
      };
    } catch (err) {
      throw new HttpException(
        {
          code: '500',
          message: err?.message || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const menu = await lastValueFrom(this.menuService.getMenuById({ menuId: id }));
      return {
        code: '200',
        message: 'success',
        data: menu,
      };
    } catch (err) {
      throw new HttpException(
        {
          code: '404',
          message: err?.message || 'Menu not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('restaurant/:restaurantId')
  async getByRestaurantId(@Param('restaurantId') restaurantId: string) {
    try {
      const result = await lastValueFrom(this.menuService.getMenusByRestaurantId({ restaurantId }));
      return {
        code: '200',
        message: 'success',
        data: result.menus,
      };
    } catch (err) {
      throw new HttpException({ code: '500', message: err?.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('name/:name')
  async getByName(@Param('name') name: string) {
    try {
      const result = await lastValueFrom(this.menuService.getMenusByName({ name }));
      return {
        code: '200',
        message: 'success',
        data: result.menus,
      };
    } catch (err) {
      throw new HttpException({ code: '500', message: err?.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  async update(@Body() updateMenuDto: any) {
    try {
      const menu = await lastValueFrom(this.menuService.updateMenu(updateMenuDto));
      return {
        code: '200',
        message: 'success',
        data: menu,
      };
    } catch (err) {
      throw new HttpException({ code: '404', message: err?.message }, HttpStatus.NOT_FOUND);
    }
  }

  @Patch('status')
  async updateStatus(@Body() statusDto: { menuId: string; available: boolean }) {
    try {
      const menu = await lastValueFrom(this.menuService.updateMenuStatus(statusDto));
      return {
        code: '200',
        message: 'success',
        data: menu,
      };
    } catch (err) {
      throw new HttpException({ code: '404', message: err?.message }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await lastValueFrom(this.menuService.deleteMenu({ menuId: id }));
      return {
        code: '200',
        message: 'success',
      };
    } catch (err) {
      throw new HttpException({ code: '500', message: err?.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAll() {
    try {
      const result = await lastValueFrom(this.menuService.getAllMenus());
      return {
        code: '200',
        message: 'success',
        data: result.menus,
      };
    } catch (err) {
      throw new HttpException({ code: '500', message: err?.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('valid/all')
  async getAllValid() {
    try {
      const result = await lastValueFrom(this.menuService.getAllValidMenus());
      return {
        code: '200',
        message: 'success',
        data: result.menus,
      };
    } catch (err) {
      throw new HttpException({ code: '500', message: err?.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
