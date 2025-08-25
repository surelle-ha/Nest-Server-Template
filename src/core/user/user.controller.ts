import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsePerformance } from 'src/infra/super-observe/super-observe.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @UsePerformance()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    @UsePerformance()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @UsePerformance()
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @UsePerformance()
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ) {
        return this.userService.update(id, dto);
    }

    @Delete(':id')
    @UsePerformance()
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}
