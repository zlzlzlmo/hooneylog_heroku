import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from './notion/notion.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [NotionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
