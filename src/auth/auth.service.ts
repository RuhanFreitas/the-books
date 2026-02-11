import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}
  
  async validateAdmin(loginAuthDto: LoginAuthDto) {
    const admin = await this.adminService.findOneByEmail(loginAuthDto.email)

    if (!admin) {
      throw new NotFoundException('Oops... someone wants to became an admin.')
    }
  }

  async validatePassword(email: string, password: string) {
    const admin = await this.adminService.findOneByEmail(email)

    const isValid = this.hashingService.compare(password, admin.password)

    if (!isValid) {
      throw new BadRequestException('You have provived something wrong.')
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    this.validateAdmin(loginAuthDto)
    this.validatePassword(loginAuthDto.email, loginAuthDto.password)

    const admin = await this.adminService.findOneByEmail(loginAuthDto.email)

    const payload = { sub: admin.id, email: admin.email }

    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }

  async register(registerAuthDo: RegisterAuthDto) {
    const admin = await this.adminService.create(registerAuthDo)

    const payload = { sub: admin.id, email: admin.email }

    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }
}
