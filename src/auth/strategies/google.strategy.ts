import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "../auth.service";
import { ConfigService } from "../../config.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
        super({
            clientID: '962349895975-qlf2jdmdsl9n4m1mmta8b9i40f0igrnp.apps.googleusercontent.com',
            clientSecret: '7NXnVvxMHJwAArBnx5HGIJvC',
            callbackURL: `${configService.get('APP_URL')}api/auth/google/callback`,
            passReqToCallback: true,
            scope: ['profile']
        })
    }


    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            const jwt: string = await this.authService.validateOAuthLogin(profile, Provider.GOOGLE);
            const user = { jwt }
            done(null, user);
        }
        catch (err) {
            // console.log(err)
            done(err, false);
        }
    }

}