import { IsIn, IsNotEmpty, IsNumber, IsString, IsUrl, MinLength } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    content: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    summary: string

    @IsNumber()
    @IsIn([1, 2, 3, 4, 5])
    rating: number

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    cover: string
}
