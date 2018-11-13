// @flow
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersMiddleware } from './users.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]), 
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
        .apply(UsersMiddleware)
        .forRoutes({path: '/users', method: RequestMethod.POST});
    }
  }
