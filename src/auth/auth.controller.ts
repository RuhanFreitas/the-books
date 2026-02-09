import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const jwt_token = await this.authService.login(loginAuthDto)

    return new AuthResponseDto(jwt_token.access_token)
  }

  @Post('/register')
  async register(@Body() registerAuthDo: RegisterAuthDto) {
    const jwt_token = await this.authService.register(registerAuthDo)

    return new AuthResponseDto(jwt_token.acess_token)
  }

}
