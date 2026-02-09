import { IsEmail, IsString, Min } from "class-validator"

export class RegisterAuthDto {
    @IsString()
    @Min(3)
    firstName: string

    @IsString()
    @Min(3)
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    @Min(3)
    password: string
}