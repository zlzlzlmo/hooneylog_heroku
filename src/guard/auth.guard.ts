import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

interface JWTPayload {
  userId: string;
  nickName: number;
  iat: number;
  exp: number;
}

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
          user_id: payload.userId,
        },
      });
      if (!user) return false;

      return false;
    } catch (error) {
      return false;
    }
  }
}
