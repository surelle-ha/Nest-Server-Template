import { Controller, Get, Render, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ version: VERSION_NEUTRAL })
export class RouteController {
    @Get(['/', '/home'])
    @Render('index')
    root() {
        return { title: 'Welcome to NestJS + EJS', message: 'Hello, World!' };
    }
}
