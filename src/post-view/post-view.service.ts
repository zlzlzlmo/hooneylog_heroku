import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface IncreasePostViewParam {
  postId: string;
}
@Injectable()
export class PostViewService {
  constructor(private prismaService: PrismaService) {}

  async totalPostView() {
    const result = await this.prismaService.postView.aggregate({
      _sum: {
        views: true,
      },
    });
    return result._sum.views;
  }

  async increasePostView({ postId }: IncreasePostViewParam) {
    const post = await this.prismaService.postView.findUnique({
      where: {
        post_id: postId,
      },
    });

    if (!post) {
      await this.prismaService.postView.create({
        data: {
          post_id: postId,
          views: 1,
        },
      });
    }

    const result = await this.prismaService.postView.update({
      where: {
        post_id: postId,
      },
      data: {
        views: (post.views += 1),
      },
    });
    return result.views;
  }
}
