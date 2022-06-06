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

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { userId, password, nickName } = createUserDto;
    const idExist = await this.prismaService.user.findUnique({
      where: {
        user_id: userId,
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
      userId,
      password: secretPassword,
      nickName,
    });

    return user;
  }

  async signin(userId: string, password: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('해당하는 유저가 존재하지 않습니다');
    }

    const [salt, hashedPassword] = user.password.split('.');

    const newHashed = await this.hash(password, salt);

    if (hashedPassword !== newHashed) {
      throw new BadRequestException('비밀번호가 틀렸습니다.');
    }

    return new JWT(user.user_id, user.nick_name).generateJWT();
  }

  private async hash(password: string, salt: string): Promise<string> {
    const result = (await scrypt(password, salt, 32)) as Buffer;
    return result.toString('hex');
  }
}
