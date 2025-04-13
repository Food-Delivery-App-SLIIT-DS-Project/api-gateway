/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthResponse, AuthServiceClient, SignInRequest } from './types';
import { SignupDto } from './dto/sign-up.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceClient: AuthServiceClient;
  constructor(@Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async signUp(dto: SignupDto): Promise<AuthResponse> {
    return lastValueFrom(this.authServiceClient.signUp(dto));
  }

  async signIn(dto: SignInRequest): Promise<AuthResponse> {
    try {
      return await lastValueFrom(this.authServiceClient.signIn(dto));
    } catch (error) {
      console.error('gRPC SignIn Error:', error);
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
