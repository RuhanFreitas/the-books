  import { ConflictException, Injectable } from '@nestjs/common';
  import { CreateAdminDto } from './dto/create-admin.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Admin } from './entities/admin.entity';
  import { HashingService } from 'src/common/hashing/hashing.service';

  @Injectable()
  export class AdminService {

      constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private readonly hashingService: HashingService
      ) {}

      async create(createAdminDto: CreateAdminDto) {
        const email = createAdminDto.email

        const userExists = await this.adminRepository.findOne({ where: { email } })

        if (userExists) {
          throw new ConflictException('This email can\'t  be used.')
        }

        const hashedPassword = await this.hashingService.hash(createAdminDto.password)

        const newAdmin = {
          ...createAdminDto,
          password: hashedPassword
        }

        let admin = this.adminRepository.create(newAdmin)

        admin = await this.adminRepository.save(admin)

        return admin
      }

      async findOneByEmail(email: string) {
        const admin = await this.adminRepository.findOne({ where: { email } })

        if (!admin) {
          throw new ConflictException('Admin not found.')
        }

        return admin
      }
      
      async findOne(id: string) {
        const admin = await this.adminRepository.findOne({ where: { id } })

        if (!admin) {
          throw new ConflictException('You\' done something wrong.')
        }

        return admin
      }

  }
