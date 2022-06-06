import { IsNotEmpty, IsString } from 'class-validator';

interface ISignInResponseDto {
  message: string;
  token: string;
}

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInResponseDto {
  messsage: string;
  token: string;

  constructor(obj: ISignInResponseDto) {
    Object.assign(this, obj);
  }
}
