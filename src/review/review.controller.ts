import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ReviewService } from './review.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';
import { ReviewResponseDto } from './dto/review-response.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @Req() req: AuthenticatedRequest) {
    const review = await this.reviewService.create(createReviewDto, req)

    return new ReviewResponseDto(review)
  }

  @Get() 
  async findAll() {
    const reviews = await this.reviewService.findAll()

    return reviews.map((review) => new ReviewResponseDto(review))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) { 
    const review = await this.reviewService.findOne(id)

    return new ReviewResponseDto(review)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    const updatedReview = await this.reviewService.update(id, updateReviewDto)  

    return new ReviewResponseDto(updatedReview)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id)
  }
}
