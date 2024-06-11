import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(
        // @Req() request: Request,
        @Body() body: AuthDTO,
        // @Res() response: Response
    ) {
        return this.authService.register(body);
    }

    @Post('login')
    login(
        // @Req() request: Request,
        @Body() body: AuthDTO,
        // @Res() response: Response
    ) {
        return this.authService.login(body);
    }
}

