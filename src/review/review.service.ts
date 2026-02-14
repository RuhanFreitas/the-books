import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';
import { SanitizerService } from 'src/common/sanitizer/sanitizer.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly sanitizerService: SanitizerService
  ) {}

  async create(createReviewDto: CreateReviewDto, req: AuthenticatedRequest): Promise<Review> {
    const cleanContent = this.sanitizerService.clean(createReviewDto.content)

    let review = this.reviewRepository.create({
      ...createReviewDto,
      content: cleanContent,
      author: { id: req.user.id }
    })

    review = this.reviewRepository.create(review)

    const savedReview = await this.reviewRepository.save(review)

    const reviewWithAuthorData = await this.reviewRepository.findOne({
      where: { id: savedReview.id },
      relations: ['author']
    })

    if (!reviewWithAuthorData) {
      throw new NotFoundException('Review couldn\'t be found.')
    }

    return reviewWithAuthorData
  }

  async findAll(): Promise<Review[]> {
    const data = await this.reviewRepository.find({
      relations: ['author']
    })

    return data
  }

  async findOne(id: string): Promise<Review> {
    const data = await this.reviewRepository.findOne({ where: { id }})

    if (!data) {
      throw new NotFoundException('Review couldn\'t be retrieved.')
    }

    return data
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, req: AuthenticatedRequest): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['author']})

     if (!review) {
      throw new NotFoundException('Review couldn\'t be retrieved.')
    }

    if (review.author.id !== req.user.id) {
       throw new ForbiddenException('You are not allowed to update this review.')
    }

    Object.assign(review, updateReviewDto)

    return this.reviewRepository.save(review)
  }

  async remove(id: string, req: AuthenticatedRequest): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['author'] })

    if (!review) {
      throw new NotFoundException('Review couldn\'t be retrieved.')
    }

    if (review.author.id !== req.user.id) {
      throw new ForbiddenException('You are not allowed to delete this review.')
    }

    await this.reviewRepository.remove(review)

    return review
  }
}
