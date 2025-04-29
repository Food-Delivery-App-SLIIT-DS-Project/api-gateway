import { Inject, Injectable } from '@nestjs/common';
import {
  DELIVERY_SERVICE_NAME,
  DeliveryServiceClient,
  OfflineStatusRequest,
  OnlineStatusRequest,
  UpdateLocationRequest,
} from './types/delivery';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class DeliveryService {
  private deliveryService: DeliveryServiceClient;
  constructor(@Inject(DELIVERY_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.deliveryService = this.client.getService<DeliveryServiceClient>(DELIVERY_SERVICE_NAME);
  }

  // goOnline -------------
  goOnline(request: OnlineStatusRequest) {
    return this.deliveryService.goOnline(request);
  }

  // goOffline -------------
  goOffline(request: OfflineStatusRequest) {
    return this.deliveryService.goOffline(request);
  }

  // updateLocation -------------
  updateLocation(request: UpdateLocationRequest) {
    return this.deliveryService.updateLocation(request);
  }
}
