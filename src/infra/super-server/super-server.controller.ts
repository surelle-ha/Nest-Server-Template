import { Controller, Get, Injectable, Logger, UseGuards } from '@nestjs/common';
import { SuperServerService } from './super-server.service';
import { DevelopmentGuard } from 'src/shared/guards/development.guard';

@Controller(['super-server', 'metrics'])
@UseGuards(DevelopmentGuard)
export class SuperServerController {
    constructor(private readonly superServerService: SuperServerService) { }

    @Get()
    getMetrics() {
        return this.superServerService.getMetrics();
    }
}
