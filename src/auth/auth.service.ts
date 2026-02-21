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
  
  async login(loginAuthDto: LoginAuthDto) {
    const admin = await this.adminService.findOneByEmail(loginAuthDto.email)

    if (!admin) {
      throw new NotFoundException('Admin not found.')
    }

    const isValid = await this.hashingService.compare(
      loginAuthDto.password,
      admin.password
    )

    if (!isValid) {
      throw new BadRequestException('Invalid credentials.')
    }

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
