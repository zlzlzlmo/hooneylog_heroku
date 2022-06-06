import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import JWT from 'src/common/jwt';
import { SignInResponseDto, SignInUserDto } from '../dtos/signin-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { id, password, nickName } = createUserDto;
    const idExist = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (idExist) {
      throw new ConflictException('이미 존재하는 아이디입니다.');
    }

    const nickExist = await this.prismaService.user.findUnique({
      where: {
        nick_name: nickName,
      },
    });

    if (nickExist) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = await this.hash(password, salt);
    const secretPassword = salt + '.' + hash;

    const user = this.userService.create({
      id,
      password: secretPassword,
      nickName,
    });

    return user;
  }

  async signin({ id, password }: SignInUserDto) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('해당하는 유저가 존재하지 않습니다');
    }

    const [salt, hashedPassword] = user.password.split('.');

    const newHashed = await this.hash(password, salt);

    if (hashedPassword !== newHashed) {
      throw new BadRequestException('비밀번호가 틀렸습니다.');
    }

    const token = await new JWT(user.id, user.nick_name).generateJWT();

    return new SignInResponseDto({
      message: '로그인 성공',
      token,
    });
  }

  private async hash(password: string, salt: string): Promise<string> {
    const result = (await scrypt(password, salt, 32)) as Buffer;
    return result.toString('hex');
  }
}
