import { Controller, Get, Injectable, Logger } from '@nestjs/common';
import { ServerInfoService } from './server-info.service';

@Controller('server-info')
export class ServerInfoController {
    constructor(private readonly serverInfoService: ServerInfoService) { }

    @Get('config')
    getConfig() {
        return this.serverInfoService.getConfig();
    }
}
