import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(4, { message: '아이디는 최소 4자리 이상 입력해야합니다.' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @MinLength(8, { message: '비밀번호는 최소 8자리 이상 입력해야합니다.' })
  @Matches('(?=.*[A-Z])')
  @IsNotEmpty()
  @IsString()
  password: string;

  @MinLength(2, { message: '닉네임은 최소 2자리 이상 입력해야합니다.' })
  @IsNotEmpty()
  @IsString()
  nickName: string;
}
