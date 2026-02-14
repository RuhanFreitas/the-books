
import { Admin } from "src/admin/entities/admin.entity"
import { Review } from "../entities/review.entity"

export class ReviewResponseDto {
    id: string
    title: string
    category: string
    content: string
    cover: string
    author: Admin
    createdAt: Date 

    constructor(review: Review) {
        this.id = review.id,
        this.title = review.title,
        this.category = review.category,
        this.content = review.content,
        this.cover = review.cover,
        this.author = review.author,
        this.createdAt = review.createdAt
    }
}