export class AuthResponseDto {
    accessToken: string

    constructor(jwt_token: string) {
        this.accessToken = jwt_token
    }
}