import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateTableDto } from './create-table.dto';
import { TableService } from './table.service';
import { Table } from './table.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Get()
    @UseGuards(AuthGuard())
    root() {
        return this.tableService.findAll();
    }
    @Get(':id')
    getTableDetails(@Param('id') id) {
        return this.tableService.findById(id);
    }
}
