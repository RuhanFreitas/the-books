import { IsNotEmpty, IsString, Min } from "class-validator";

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
}
