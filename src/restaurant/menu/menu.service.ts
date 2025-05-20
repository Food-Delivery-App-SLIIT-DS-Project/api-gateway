/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  MENU_SERVICE_NAME,
  MenuServiceClient,
  CreateMenuRequest,
  MenuId,
  RestaurantId,
  NameRequest,
  UpdateMenuRequest,
  UpdateMenuStatusRequest,
  Empty,
  MenuList,
  Menu,
} from '../types/menu';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RESTAURANT_SERVICE_NAME } from '../types/restaurant';

@Injectable()
export class MenuService implements OnModuleInit {
  private menuServiceClient: MenuServiceClient;

  constructor(@Inject(RESTAURANT_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.menuServiceClient = this.client.getService<MenuServiceClient>(MENU_SERVICE_NAME);
  }

  createMenu(request: CreateMenuRequest): Observable<Menu> {
    console.log('Creating menu:', request);
    return this.menuServiceClient.createMenu(request);
  }

  getMenuById(request: MenuId): Observable<Menu> {
    return this.menuServiceClient.getMenuById(request);
  }

  getMenusByRestaurantId(request: RestaurantId): Observable<MenuList> {
    return this.menuServiceClient.getMenusByRestaurantId(request);
  }

  getMenusByName(request: NameRequest): Observable<MenuList> {
    return this.menuServiceClient.getMenusByName(request);
  }

  updateMenu(request: UpdateMenuRequest): Observable<Menu> {
    return this.menuServiceClient.updateMenu(request);
  }

  updateMenuStatus(request: UpdateMenuStatusRequest): Observable<Menu> {
    return this.menuServiceClient.updateMenuStatus(request);
  }

  deleteMenu(request: MenuId): Observable<Empty> {
    return this.menuServiceClient.deleteMenu(request);
  }

  getAllMenus(): Observable<MenuList> {
    return this.menuServiceClient.getAllMenus({});
  }

  getAllValidMenus(): Observable<MenuList> {
    return this.menuServiceClient.getAllValidMenus({});
  }
}
