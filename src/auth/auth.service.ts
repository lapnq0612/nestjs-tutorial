import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { AuthDTO } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})

export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(authDTO: AuthDTO) {
        // generate password
        const hasPassword = await argon.hash(authDTO.password)
        try {
            //insert to DB
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hasPassword: hasPassword,
                    firstName: 'Ngo Quang',
                    lastName: 'Lap'
                },
                 //only select id, email, createdAt
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })
            return await this.signJwtToken(user.id, user.email);
        } catch (error) {
            if(error.code == 'P2002') {
                throw new ForbiddenException('User with this email already exists')
            }

            throw error;
        }
    }

    async login(authDTO: AuthDTO) {
        const user = await this.prismaService.user.findUnique({ 
            where: {
                email: authDTO.email
            }
        })
        console.log(user, 'user')
        if(!user) {
            throw new ForbiddenException('User does not exit')
        }

        const passwordMatched = await argon.verify(
            user.hasPassword,
            authDTO.password
        )
        if (!passwordMatched) {
            throw new ForbiddenException("Incorrect password")
        }
        delete user.hasPassword // remove field password

        return await this.signJwtToken(user.id, user.email);
    }

    // generate jwt
    async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
        const payload = {
            sub: userId,
            email
        }

         // jwt string
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '30m',
            secret: this.configService.get('JWT_SECRET') // get from .env file
        })

        return {
            accessToken: jwtString
        }
    }
};