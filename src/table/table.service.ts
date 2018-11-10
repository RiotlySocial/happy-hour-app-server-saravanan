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
    return await createdTable.save();
  }

  async findAll(): Promise<Table[]> {
    return await this.tableModel.find().exec();
  }
  async findById(id:string): Promise<Table> {
    return await this.tableModel.findOne({'_id': id}).exec();
  }
}