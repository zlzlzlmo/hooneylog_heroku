import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';

interface JWTPayload {
  userId: string;
  nickName: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split('Bearer ')[1];

    try {
      const payload = (await jwt.verify(
        token,
        process.env.JSON_TOKEN_KEY,
      )) as JWTPayload;

      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

      if (!user) return false;

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
