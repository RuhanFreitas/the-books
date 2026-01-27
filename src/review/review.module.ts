import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from 'typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
