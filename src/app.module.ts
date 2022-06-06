import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from './notion/notion.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostViewModule } from './post-view/post-view.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';

@Module({
  imports: [NotionModule, PrismaModule, PostViewModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
