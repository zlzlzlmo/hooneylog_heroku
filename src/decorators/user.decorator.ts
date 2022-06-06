import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserInfo {
  userId: string;
  nickName: number;
  iat: number;
  exp: number;
}

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as UserInfo;
  },
);
