import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';
import { SanitizerService } from 'src/common/sanitizer/sanitizer.service';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly sanitizerService: SanitizerService
  ) {}

  async create(createReviewDto: CreateReviewDto, req: AuthenticatedRequest): Promise<Review> {
    let data = { ...createReviewDto, author: { id: req.user.id } }

    const cleanContent = this.sanitizerService.clean(data.content)

    data = { ...createReviewDto, author: { id: req.user.id }, content: cleanContent }

    const review = this.reviewRepository.create(data)

    const savedReview = await this.reviewRepository.save(review)

    const reviewWithAuthorData = await this.reviewRepository.findOne({
      where: { id: savedReview.id },
      relations: ['author']
    })

    if (!reviewWithAuthorData) {
      throw new InternalServerErrorException('Review couldn\'t be found.')
    }

    return reviewWithAuthorData
  }

  async findAll(): Promise<Review[]> {
    const data = await this.reviewRepository.find({
      relations: ['author']
    })

    if (!data) {
      throw new InternalServerErrorException('Reviews couldn\'t be retrieved.')
    }

    return data
  }

  async findOne(id: string): Promise<Review> {
    const data = await this.reviewRepository.findOne({ where: { id }})

    if (!data) {
      throw new InternalServerErrorException('Review couldn\'t be retrieved.')
    }

    return data
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, req: AuthenticatedRequest): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['author']})

     if (!review) {
      throw new InternalServerErrorException('Review couldn\'t be retrieved.')
    }

    if (review.author.id !== req.user.id) {
       throw new ForbiddenException('You are not allowed to update this review.')
    }

    Object.assign(review, updateReviewDto)

    return this.reviewRepository.save(review)
  }

  async remove(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } })

    if (!review) {
      throw new InternalServerErrorException('Review couldn\'t be retrieved.')
    }

    await this.reviewRepository.remove(review)

    return review
  }
}
