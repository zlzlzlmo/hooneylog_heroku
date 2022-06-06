import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInUserDto } from './dtos/signin-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('signin')
  signIn(@Body() body: SignInUserDto) {
    console.log('signin');
    return this.authService.signin(body.userId, body.password);
  }
}
