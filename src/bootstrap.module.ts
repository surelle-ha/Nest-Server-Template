import { Module } from '@nestjs/common';
import { BasicAuthModule } from './auth/basic-auth.module';
import { PluginModule } from './plugins/plugin.module';
import { InfraModule } from './infra/infra.module';
import { CoreModule } from './core/core.module';
import { RouteModule } from './views/route.module';

const MODULE_LOADER = [
  BasicAuthModule,
  InfraModule,
  CoreModule,
  PluginModule,
  RouteModule
]

@Module({
  imports: MODULE_LOADER,
})
export class BootstrapModule { }
