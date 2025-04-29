/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { GoOnlineDto } from './dto/goOnline.dto';
import { successResponse, errorResponse } from '../../utils/response'; // Adjust path if needed
import { catchError, throwError, lastValueFrom } from 'rxjs';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  // goOnline -------------
  @Post('go-online')
  async goOnline(@Body() request: GoOnlineDto) {
    try {
      const result = await lastValueFrom(
        this.deliveryService.goOnline(request).pipe(
          catchError((err) => {
            console.error('gRPC Error (goOnline):', err);
            return throwError(
              () =>
                new HttpException(
                  errorResponse(500, err?.message || 'Internal server error'),
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      return successResponse('Driver is online', result);
    } catch (err) {
      console.error('Caught Error (goOnline):', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(errorResponse(500, 'Unexpected error occurred'), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // goOffline -------------
  @Post('go-offline')
  async goOffline(@Body() body: { userId: string }) {
    try {
      const result = await lastValueFrom(
        this.deliveryService.goOffline({ userId: body.userId }).pipe(
          catchError((err) => {
            console.error('gRPC Error (goOffline):', err);
            return throwError(
              () =>
                new HttpException(
                  errorResponse(500, err?.message || 'Internal server error'),
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      return successResponse('Driver is offline', result);
    } catch (err) {
      console.error('Caught Error (goOffline):', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(errorResponse(500, 'Unexpected error occurred'), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // updateLocation -------------
  @Post('update-location')
  async updateLocation(@Body() request: GoOnlineDto) {
    try {
      const result = await lastValueFrom(
        this.deliveryService.updateLocation(request).pipe(
          catchError((err) => {
            console.error('gRPC Error (updateLocation):', err);
            return throwError(
              () =>
                new HttpException(
                  errorResponse(500, err?.message || 'Internal server error'),
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
            );
          }),
        ),
      );

      return successResponse('Location updated', result);
    } catch (err) {
      console.error('Caught Error (updateLocation):', err);
      if (err instanceof HttpException) throw err;

      throw new HttpException(errorResponse(500, 'Unexpected error occurred'), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
