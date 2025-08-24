import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';

const MODULE_LOADER = [
  HealthModule
]

@Module({
  imports: MODULE_LOADER,
})
export class PluginModule { }
