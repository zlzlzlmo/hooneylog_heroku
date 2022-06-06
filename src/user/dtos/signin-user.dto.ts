import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
