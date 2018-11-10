import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateTableDto } from './create-table.dto';
import { TableService } from './table.service';
import { Table } from './table.interface';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Get()
    root() {
        return this.tableService.findAll();
    }
    @Get(':id')
    getTableDetails(@Param('id') id) {
        return this.tableService.findById(id);
    }
}
