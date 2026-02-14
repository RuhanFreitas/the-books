import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common'
import { ReviewService } from './review.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';
import { ReviewResponseDto } from './dto/review-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @Req() req: AuthenticatedRequest) {
    const updatedReview = await this.reviewService.update(id, updateReviewDto, req)  

    return new ReviewResponseDto(updatedReview)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.reviewService.remove(id, req)
  }
}
