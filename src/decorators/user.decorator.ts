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
    console.log('user 정보 : ', request.user);
    return request.user as UserInfo;
  },
);
