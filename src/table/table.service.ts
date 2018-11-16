import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './table.interface';
import { CreateTableDto } from './create-table.dto';

@Injectable()
export class TableService {
  constructor(@InjectModel('Table') private readonly tableModel: Model<Table>) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    const createdTable = new this.tableModel(createTableDto);
    const doc = await createdTable.save();
    return doc.populate('members').execPopulate();
  }

  async findAll(): Promise<Table[]> {
    return await this.tableModel.find().populate('members').exec();
  }
  async findByIdAndUpdateMember(id:string, member:string): Promise<Table> {
    return await this.tableModel.findOneAndUpdate({'_id': id}, { "$addToSet": { members: member } }, {new: true}).populate('members').exec();
  }
  async removeMemberFromTable(userId, tableId): Promise<Table> {
    return await this.tableModel.update({'_id': tableId}, {$pull: { 'members': userId }}).exec();
  }
  async searchByMembers(userIds): Promise<Table[]> {
    return await this.tableModel.find({members: {$in: userIds}}).populate({path: 'members', select:'first_name last_name avatar'}).lean().exec();
  }
}