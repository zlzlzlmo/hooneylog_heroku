import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { CreateReplyAgainDto } from './dto/create-replyAgain.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create({ postId, comment }: CreateReplyDto, userId: string) {
    const cmt = await this.prismaService.reply.create({
      data: {
        post_id: postId,
        comment,
        user_id: userId,
      },
    });
    return cmt;
  }

  async createReply(
    { postId, parentId, comment, author }: CreateReplyAgainDto,
    userId: string,
  ) {
    const cmt = await this.prismaService.replyAgain.create({
      data: {
        post_id: postId,
        comment,
        user_id: userId,
        parent_id: parentId,
        author,
      },
    });

    return cmt;
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
