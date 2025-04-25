import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
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
} from './types/menu';

@Injectable()
export class MenuService implements OnModuleInit {
  private menuService: MenuServiceClient;

  constructor(@Inject(MENU_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.menuService = this.client.getService<MenuServiceClient>(MENU_SERVICE_NAME);
  }

  createMenu(data: CreateMenuRequest) {
    return this.menuService.createMenu(data);
  }

  getMenuById(data: MenuId) {
    return this.menuService.getMenuById(data);
  }

  getMenusByRestaurantId(data: RestaurantId) {
    return this.menuService.getMenusByRestaurantId(data);
  }

  getMenusByName(data: NameRequest) {
    return this.menuService.getMenusByName(data);
  }

  updateMenu(data: UpdateMenuRequest) {
    return this.menuService.updateMenu(data);
  }

  updateMenuStatus(data: UpdateMenuStatusRequest) {
    return this.menuService.updateMenuStatus(data);
  }

  deleteMenu(data: MenuId) {
    return this.menuService.deleteMenu(data);
  }

  getAllMenus(data: Empty) {
    return this.menuService.getAllMenus(data);
  }

  getAllValidMenus(data: Empty) {
    return this.menuService.getAllValidMenus(data);
  }
}
