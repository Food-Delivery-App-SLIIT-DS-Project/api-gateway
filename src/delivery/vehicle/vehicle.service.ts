import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FindOneVehicleDto,
  FindVehicleByDriverIdDto,
  UpdateVehicleAvailabilityDto,
  Vehicle,
  VEHICLE_SERVICE_NAME,
  VehicleList,
  VehicleLocation,
  VehicleServiceClient,
} from '../types/vehicle';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { DELIVERY_SERVICE_NAME } from '../types/delivery';

@Injectable()
export class VehicleService {
  private vehicleService: VehicleServiceClient;

  constructor(@Inject(DELIVERY_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.vehicleService = this.client.getService<VehicleServiceClient>(VEHICLE_SERVICE_NAME);
  }

  createVehicle(payload: CreateVehicleDto): Observable<Vehicle> {
    return this.vehicleService.createVehicle(payload);
  }
  getAllVehicles(): Observable<VehicleList> {
    return this.vehicleService.findAllVehicles({});
  }
  getVehicleById(vehicleId: FindOneVehicleDto): Observable<Vehicle> {
    return this.vehicleService.findVehicleById(vehicleId);
  }
  deleteVehicle(vehicleId: FindOneVehicleDto): Observable<Vehicle> {
    return this.vehicleService.deleteVehicle(vehicleId);
  }
  getVehicleByDriverId(driverId: FindVehicleByDriverIdDto): Observable<Vehicle> {
    return this.vehicleService.findVehicleByDriverId(driverId);
  }
  getAvailableVehicles(): Observable<VehicleList> {
    return this.vehicleService.findAvailableVehicles({});
  }
  updateVehicleAvailability(payload: UpdateVehicleAvailabilityDto): Observable<Vehicle> {
    return this.vehicleService.updateVehicleAvailability(payload);
  }
  updateVehicleLocation(payload: VehicleLocation): Observable<VehicleLocation> {
    return this.vehicleService.updateVehicleLocation(payload);
  }
  findVehicleLocation(vehicleId: FindOneVehicleDto): Observable<VehicleLocation> {
    return this.vehicleService.findVehicleLocation(vehicleId);
  }
  getAllVehicleLocations(): Observable<VehicleLocation> {
    return this.vehicleService.findAllVehicleLocations({});
  }
  deleteVehicleLocation(vehicleId: FindOneVehicleDto): Observable<VehicleLocation> {
    return this.vehicleService.deleteVehicleLocation(vehicleId);
  }
}
