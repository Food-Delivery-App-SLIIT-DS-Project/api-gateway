/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignupDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ApiResponse, AuthData, Role, User } from './types/auth.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() signupDto: SignupDto): Promise<ApiResponse<AuthData>> {
    // console.log('signupDto', signupDto);
    const result = await this.authService.signUp(signupDto);
    return {
      code: 0,
      msg: '',
      data: {
        // eslint-disable-next-line prettier/prettier
        role: (result.user?.role as Role) ?? ('customer' as Role),
        user: result.user as unknown as User,
        token: {
          access: result.accessToken,
          refresh: result.refreshToken,
          expire_seconds: 15 * 60,
          uid: result.user?.userId ?? '',
        },
      },
    };
  }
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<ApiResponse<AuthData>> {
    // console.log('signupDto', signInDto);
    const result = await this.authService.signIn({
      ...signInDto,
      fcmToken: signInDto.fcmToken ?? undefined,
    });
    return {
      code: 0,
      msg: '',
      data: {
        // eslint-disable-next-line prettier/prettier
        role: (result.user?.role as Role) ?? ('customer' as Role),
        user: result.user as unknown as User,
        token: {
          access: result.accessToken,
          refresh: result.refreshToken,
          expire_seconds: 15 * 60,
          uid: result.user?.userId ?? '',
        },
      },
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req, @Body() body: { refreshToken: string }) {
    const userId = req.user.userId;
    const { refreshToken } = body;
    // console.log('userId', req.user);
    // Optionally: validate the refreshToken belongs to this user (if stored in DB)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.authService.logout(refreshToken, userId);

    return {
      code: '0',
      msg: 'Logout successful',
      data: {},
    };
  }
}
