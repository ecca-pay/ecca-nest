import { Controller, Get, Request, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard, AuthService, Session } from '@thallesp/nestjs-better-auth';
import { Public } from '@thallesp/nestjs-better-auth';
import type { Request as ExpressRequest } from 'express';
import { auth } from 'src/auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('users')
export class UserController {
  constructor(private authService: AuthService<typeof auth>) {}

  @Get('me')
  getProfile(@Session() session: UserSession, @Headers('authorization') authHeader?: string) {
    // Handle both Cookie and Bearer token
    console.log("Auth header:", authHeader);
    console.log("Session:", session);
    return session;
  }
  @Get('public')
  @Public()
  publicRoute() {
    return { message: 'This route is public' };
  }

  @Get('accounts')
  async getAccounts(@Request() req: ExpressRequest) {
    // Pass the request headers to the auth API
    const accounts = await this.authService.api.listUserAccounts({
      headers: fromNodeHeaders(req.headers),
    });

    return { accounts };
  }
}
