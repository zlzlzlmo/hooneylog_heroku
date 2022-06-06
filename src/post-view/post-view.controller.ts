import { Body, Controller, Get, Ip, Post, Req } from '@nestjs/common';
import { InCreasePostViewDto } from './dto/postView.dto';
import { PostViewService } from './post-view.service';

@Controller('post/view')
export class PostViewController {
  constructor(private postViewService: PostViewService) {}

  @Get('total')
  totalPostView(@Req() request) {
    console.log(request.connection.remoteAddress);
    return this.postViewService.totalPostView();
  }
  @Post()
  increasePostView(@Body() { postId }: InCreasePostViewDto, @Req() req) {
    return this.postViewService.increasePostView({ postId });
  }
}
