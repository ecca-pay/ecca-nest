import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  //   @Get('me')
  //    getProfile(@Session() session: UserSession) {
  //     return { user: session.user };
  //   }
}
