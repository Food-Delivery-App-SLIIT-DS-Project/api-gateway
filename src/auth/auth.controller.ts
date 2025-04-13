/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignupDto } from './dto/sign-up.dto';
import { AuthResponse } from './types';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() signupDto: SignupDto): Promise<AuthResponse> {
    console.log('signupDto', signupDto);
    return await this.authService.signUp(signupDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<AuthResponse> {
    console.log('signupDto', signInDto);
    return await this.authService.signIn(signInDto);
  }
}
