import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { DevelopmentGuard } from 'src/shared/guards/development.guard';

@Controller(['health', 'ping'])
export class HealthController {
  constructor(private readonly healthService: HealthService) { }

  @Get('')
  @UseGuards(DevelopmentGuard)
  async check() {
    return this.healthService.check();
  }
}
