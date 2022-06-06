import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReplyAgainDto {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsNumber()
  @IsNotEmpty()
  parentId: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}
