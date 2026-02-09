import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { AdminResponseDto } from './dto/admin-response.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.create(createAdminDto)

    return new AdminResponseDto(admin)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Req() req: AuthenticatedRequest) {
    const admin = await this.adminService.findOne(req.user.id)

    return new AdminResponseDto(admin)
  }

}
