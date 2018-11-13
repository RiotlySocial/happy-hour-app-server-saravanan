import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './users.interface';
import { CreateUsersDto } from './create-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<Users>) {}

  async create(createUserDto: CreateUsersDto): Promise<Users> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }
  
  async findAll(): Promise<Users[]> {
    return await this.userModel.find().exec();
  }
  async findOneByUId(uid:string): Promise<Users> {
    return await this.userModel.findOne({'uid': uid}).exec();
  }
}