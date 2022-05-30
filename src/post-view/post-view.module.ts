import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { PostViewService } from './post-view.service';
import { PostViewController } from './post-view.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [PrismaModule],
  providers: [
    PostViewService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [PostViewController],
})
export class PostViewModule {}
