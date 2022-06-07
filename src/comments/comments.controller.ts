import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User, UserInfo } from 'decorators/user.decorator';
import { AuthGuard } from 'guard/auth.guard';
import { CommentsService } from './comments.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { CreateReplyAgainDto } from './dto/create-replyAgain.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseGuards(AuthGuard)
@Controller('reply')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() body: CreateReplyDto, @User() user: UserInfo) {
    return this.commentsService.create(body, user.userId);
  }

  @Post('again')
  createReply(@Body() body: CreateReplyAgainDto, @User() user: UserInfo) {
    return this.commentsService.createReply(body, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
