import { IsEmail, IsString, Min, MinLength } from "class-validator"

export class RegisterAuthDto {
    @IsString()
    @Min(3)
    firstName: string

    @IsString()
    @MinLength(3)
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(3)
    password: string
}