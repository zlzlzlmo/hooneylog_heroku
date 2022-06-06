import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      const token = request?.headers?.authorization.split('Bearer ')[1];
      const user = jwt.decode(token);
      request.user = user;
    }

    return next.handle();
  }
}
