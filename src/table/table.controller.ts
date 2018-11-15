import { Controller, Get, Post, Body, Param, UseGuards, Req, Res } from '@nestjs/common';
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

    /**
     * - all tables - NEW
     * - first user goes into table - create table with member and position
     * - leave table - remove member
     * - check if only 8 tables and only 4 members
     * - websoctets or polling?
     * - another user - update table
     * - handle jwt expired case
     */
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
      // Get users matching search query
      let users = await this.usersService.search(searchQuery);
      //Get only _ids
      const userIds = users.map(user => {
        return user._id;
      })
      // Find table in which user is in
      let table = await this.tableService.searchByMembers(userIds);
      res.json(table);
    }
}
