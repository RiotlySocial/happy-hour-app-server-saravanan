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
  async upsert(createUserDto: CreateUsersDto): Promise<Users> {
    return await this.userModel.findOneAndUpdate(
        { uid: createUserDto.uid, provider: createUserDto.provider }, 
        createUserDto, 
        { upsert: true, new: true }
      ).exec();
  }
  async findAll(): Promise<Users[]> {
    return await this.userModel.find().exec();
  }
  async findOneByUId(uid:string): Promise<Users> {
    return await this.userModel.findOne({'uid': uid}).exec();
  }

  async search(query:string): Promise<Users[]> {
    return await this.userModel.find({$or : [{first_name: { '$regex' : query, '$options' : 'i' }}, {last_name: { '$regex' : query, '$options' : 'i' }}]}).populate('').lean().exec();
  }
}