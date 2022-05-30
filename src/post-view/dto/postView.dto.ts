import { IsNotEmpty, IsString } from 'class-validator';

export class InCreasePostViewDto {
  @IsString()
  @IsNotEmpty()
  postId: string;
}
