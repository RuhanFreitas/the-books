import { IsEmail, IsString, Min, MinLength } from "class-validator"

export class LoginAuthDto {
    @IsEmail()
    email: string
        
    @IsString()
    @MinLength(3)
    password: string
}
