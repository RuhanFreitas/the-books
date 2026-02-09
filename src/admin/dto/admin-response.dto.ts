import { Admin } from "../entities/admin.entity"

export class AdminResponseDto {
    id: string
    firstName: string
    lastName: string
    email: string

    constructor(admin: Admin) {
        this.id = admin.id
        this.firstName = admin.firstName,
        this.lastName = admin.lastName,
        this.email = admin.email
    }
}