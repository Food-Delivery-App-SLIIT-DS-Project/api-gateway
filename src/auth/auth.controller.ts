/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignupDto } from './dto/sign-up.dto';
import { AuthResponse } from './types';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

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

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req, @Body() body: { refreshToken: string }) {
    const userId = req.user.userId;
    const { refreshToken } = body;
    console.log('userId', req.user);
    // Optionally: validate the refreshToken belongs to this user (if stored in DB)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.authService.logout(refreshToken, userId);

    return { message: 'Logged out successfully' };
  }
}
