import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
export enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY'; // <- replace this with your secret key
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}
  // async createToken() {
  //   const user: JwtPayload = { email: 'test@email.com' };
  //   const accessToken = this.jwtService.sign(user);
  //   return {
  //     expiresIn: 3600,
  //     accessToken,
  //   };
  // }
  async validateOAuthLogin(profile: any,provider: Provider): Promise<string>
    {
        try 
        {
            const user = await this.usersService.upsert({
              first_name: profile.name.givenName,
              last_name: profile.name.familyName,
              email: (profile.emails && profile.emails[0].value),
              avatar: (profile.photos && profile.photos[0].value),
              gender: profile.gender,
              uid: profile.id,
              provider: provider
            });
                
            const payload = {
                uid: user.uid,
                name: user.first_name,
                provider
            }

            const jwt: string = this.jwtService.sign(payload, { expiresIn: 3600*24*7 });
            return jwt;
        }
        catch (err)
        {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
  // async signIn(): Promise<string> {
  //   // In the real-world app you shouldn't expose this method publicly
  //   // instead, return a token once you verify user credentials
  //   const user: JwtPayload = { email: 'user@email.com' };
  //   return this.jwtService.sign(user);
  // }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByUId(payload.uid);
  }
}