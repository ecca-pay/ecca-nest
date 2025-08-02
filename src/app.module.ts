import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule, AuthGuard } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule.forRoot(auth), UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
