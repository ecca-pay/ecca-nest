import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthService, Session } from '@thallesp/nestjs-better-auth';
import { Public } from '@thallesp/nestjs-better-auth';
import type { Request as ExpressRequest } from 'express';
import { auth } from 'src/auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('users')
// @UseGuards(AuthGuard) // Apply to all routes in this controller
export class UserController {
  constructor(private authService: AuthService<typeof auth>) {}

  @Get('me')
  getProfile(@Session() session: UserSession) {
    return session;
  }

  @Get('public')
  @Public() // Mark this route as public (no authentication required)
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
