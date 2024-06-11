import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        configService: ConfigService,
        public prismaService: PrismaService
    ) {
        super({
            // yeu cau token cho nhung request bat buoc
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }
    //required needs to be validated
    // dung de lay ra use 
    async validate(
        payload: {
            sub: number,
            email: string,
            iat: number,
            exp: number
        }
    ) { 
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        delete user.hasPassword;

        return user;
    }
}