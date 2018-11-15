import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TableSchema } from './table.schema';
import { TableMiddleware } from './table.middleware';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Table', schema: TableSchema }]), UsersModule],
  controllers: [TableController],
  providers: [UsersService, TableService],
})
export class TableModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
        .apply(TableMiddleware)
        .forRoutes({path: '/table', method: RequestMethod.POST});
    }
  }
