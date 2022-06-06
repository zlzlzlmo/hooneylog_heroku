import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './interceptor/user.interceptor';

@Module({
  imports: [PrismaModule],
  providers: [UserService, AuthService],
  controllers: [UserController],
})
export class UserModule {}
