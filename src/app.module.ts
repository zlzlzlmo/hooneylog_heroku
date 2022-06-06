import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from './notion/notion.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostViewModule } from './post-view/post-view.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptor/user.interceptor';

@Module({
  imports: [
    NotionModule,
    PrismaModule,
    PostViewModule,
    UserModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AppModule {}
