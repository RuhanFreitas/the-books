import { IsIn, IsNotEmpty, IsNumber, IsString, IsUrl, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    @Min(3)
    title: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsString()
    @IsNotEmpty()
    @Min(3)
    content: string

    @IsString()
    @IsNotEmpty()
    @Min(3)
    summary: string

    @IsNumber()
    @IsIn([1, 2, 3, 4, 5])
    rating: number

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    cover: string
}
