import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './entities/review.entity'
import { CommonModule } from 'src/common/common.module'
import { AiModule } from 'src/ai/ai.module'

@Module({
  imports: [TypeOrmModule.forFeature([Review]), CommonModule, AiModule],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
