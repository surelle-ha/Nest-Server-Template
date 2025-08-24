import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserQuery } from './queries/get-user.query';

@Controller('users')
export class UserController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.commandBus.execute(new CreateUserCommand(dto));
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.queryBus.execute(new GetUserQuery(Number(id)));
    }
}
