import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
