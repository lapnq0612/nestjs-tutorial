import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';

@Controller('user')
export class UserController {

    @UseGuards(MyJwtGuard) // required token for authentication
    @Get('me')
    me(@GetUser() user: User) {
        return user
    }
}
