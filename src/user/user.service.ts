import {
  BadGatewayException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import JWT from 'src/common/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { userId, password, nickName } = createUserDto;

    try {
      await this.prismaService.user.create({
        data: {
          user_id: userId,
          password,
          nick_name: nickName,
        },
      });

      const jwt = await new JWT(userId, password).generateJWT();
      return jwt;
    } catch (error) {
      throw new BadGatewayException('서버 오류로 회원가입에 실패 하였습니다.');
    }
  }

  async findOne(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        user_id: userId,
      },
    });
  }
}
