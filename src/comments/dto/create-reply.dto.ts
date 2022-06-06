import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
