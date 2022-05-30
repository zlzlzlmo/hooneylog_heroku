import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InCreasePostViewDto } from './dto/postView.dto';
import { PostViewService } from './post-view.service';

@Controller('post/view')
export class PostViewController {
  constructor(private postViewService: PostViewService) {}

  @Get('total')
  totalPostView() {
    return this.postViewService.totalPostView();
  }
  @Post()
  increasePostView(@Body() { postId }: InCreasePostViewDto) {
    return this.postViewService.increasePostView({ postId });
  }
}
