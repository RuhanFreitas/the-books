
import { Admin } from "src/admin/entities/admin.entity"
import { Review } from "../entities/review.entity"

export class ReviewResponseDto {
    id: string
    title: string
    category: string
    content_pt: string
    content_en: string
    content_fr: string
    summary: string
    rating: number
    cover: string
    author: Admin
    createdAt: Date 

    constructor(review: Review) {
        this.id = review.id,
        this.title = review.title,
        this.category = review.category,
        this.content_pt = review.content_pt,
        this.content_en = review.content_en,
        this.content_fr = review.content_fr,
        this.summary = review.summary,
        this.rating = review.rating,
        this.cover = review.cover,
        this.author = review.author,
        this.createdAt = review.createdAt
    }
}