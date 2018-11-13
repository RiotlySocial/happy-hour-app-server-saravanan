// @flow
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.register({
      secretOrPrivateKey: 'VERY_SECRET_KEY',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule { }
