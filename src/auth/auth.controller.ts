import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '../config.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService) {}
    
    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin()
    {
        // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res)
    {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        if (jwt)
            res.redirect(`${this.configService.get('FE_URL')}?token=${jwt}`);
        else 
            res.redirect(`${this.configService.get('FE_URL')}?err`);

        //     if (jwt)
        //     res.redirect('http://localhost:3000/?token=' + jwt);
        // else 
        //     res.redirect('http://localhost:3000/?err');
    }
    
    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource()
    {
        return {name: 'prot2'};
    }

    @Get('logout')
    @UseGuards(AuthGuard('jwt'))
    logout(@Req() req, @Res() res)
    {
        req.logout();
        res.json({loggedOut: true});
    }
}