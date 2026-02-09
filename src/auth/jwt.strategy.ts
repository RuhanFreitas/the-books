import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./types/jwt-payload.type";
import { AdminService } from "src/admin/admin.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly adminService: AdminService
    ) {
        const secret = process.env.JWT_SECRET

        if (!secret) {
            throw new InternalServerErrorException('JWT Secret not found in .env.')
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        })
    }

    async validate(payload: JwtPayload) {
        const admin = await this.adminService.findOne(payload.sub)

        if (!admin) {
            throw new UnauthorizedException('You are not authorized. You need to login.')
        }

        return {
            id: admin.id,
            email: admin.email
        }
    }
}