import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from './notion/notion.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostViewModule } from './post-view/post-view.module';

@Module({
  imports: [NotionModule, PrismaModule, PostViewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
