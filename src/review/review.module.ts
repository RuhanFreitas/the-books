import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './entities/review.entity'
import { CommonModule } from 'src/common/common.module'

@Module({
  imports: [TypeOrmModule.forFeature([Review]), CommonModule],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
