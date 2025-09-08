import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { RenderModule } from './render/render.module';

const MODULE_LOADER = [
  HealthModule,
  RenderModule
]

@Module({
  imports: MODULE_LOADER,
})
export class PluginModule { }
