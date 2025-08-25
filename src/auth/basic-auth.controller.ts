import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BasicAuthService } from './basic-auth.service';
import { LoginDto } from './dto/login.dto';
import { BasicAuthGuard } from './basic-auth.guard';
import { UsePerformance } from 'src/infra/super-observe/super-observe.decorator';

@Controller('auth')
export class BasicAuthController {
    constructor(private readonly authService: BasicAuthService) { }

    @Post('login')
    @UsePerformance()
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('test')

    @UsePerformance()
    @UseGuards(BasicAuthGuard)
    async test() {
        return { message: 'Test successful' };
    }
}
