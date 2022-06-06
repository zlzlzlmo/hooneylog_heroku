import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}
