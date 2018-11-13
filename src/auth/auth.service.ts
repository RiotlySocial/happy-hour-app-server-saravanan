import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { sign } from 'jsonwebtoken';
export enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY'; // <- replace this with your secret key
  constructor(/*private readonly jwtService: JwtService,*/ private readonly usersService: UsersService) {}
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
            // You can add some registration logic here, 
            // to register the user using their thirdPartyId (in this case their googleId)
            // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);
            
            // if (!user)
                // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);
            const user = await this.usersService.create({
              first_name: profile.name.givenName,
              last_name: profile.name.familyName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              gender: profile.gender,
              uid: profile.id,
              provider: provider
            });
                
            const payload = {
                uid: user.uid,
                name: user.first_name,
                provider
            }

            const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
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