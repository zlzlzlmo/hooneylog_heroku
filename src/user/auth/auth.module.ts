import { Module } from '@nestjs/common';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UserService],
})
export class AuthModule {}
