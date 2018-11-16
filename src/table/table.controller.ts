import { Controller, Get, Post, Body, Param, UseGuards, Req, Res } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateTableDto } from './create-table.dto';
import { TableService } from './table.service';
import { Table } from './table.interface';
import { AuthGuard } from '@nestjs/passport';
import { Map, fromJS } from 'immutable';
import { UsersService } from '../users/users.service';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService,
      private readonly usersService: UsersService) {}

    @Get('all')
    @UseGuards(AuthGuard('jwt'))
    root() {
        return this.tableService.findAll();
    }
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getTableDetails(@Req() req, @Res() res, @Param('id') id) {
        const user = req.user;
        const table = await this.tableService.findByIdAndUpdateMember(id, user._id);
        res.json(table);
    }
    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async createNewTable(@Req() req, @Res() res){
        const user = req.user;
        const position:number = req.body.position;
        const members: [String] = [user._id];

        // TODO: handle if multiple users try to join same table 
        const tableData = {position, members};
        const table = await this.tableService.create(tableData);
        res.json(table);
    }

    @Post('leave/:tableId')
    @UseGuards(AuthGuard('jwt'))
    async leaveTable(@Req() req, @Res() res, @Param('tableId') tableId){
        const user = req.user;
        const response = await this.tableService.removeMemberFromTable(user._id, tableId);
        res.json(response);
    }

    @Get('search/:search')
    @UseGuards(AuthGuard('jwt'))
    async searchUser(@Req() req, @Res() res, @Param('search') searchQuery) {
      if(!searchQuery){
        res.json({members: [], _id: null});
        return;
      }
      // Get users matching search query
      let users = await this.usersService.search(searchQuery);
      //Get only _ids
      const userIds = users.map(user => {
        return user._id.toString();
      })
      // Find tables in which users are in
      let tables = await this.tableService.searchByMembers(userIds);
      const result = tables.map(table => {
        const matches = table.members.filter(member => {const userId:Types.ObjectId = member['_id'];return (userIds.indexOf(userId.toString()) > -1)});
        const members = table.members.filter(member => {const userId:Types.ObjectId = member['_id'];return (userIds.indexOf(userId.toString()) === -1)});
        return {matches, members, _id: table['_id']};
      });
      res.json(result);
    }
}
