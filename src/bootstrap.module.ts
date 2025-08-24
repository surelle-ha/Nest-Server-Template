import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PluginModule } from './plugins/plugin.module';
import { InfraModule } from './infra/infra.module';
import { CoreModule } from './core/core.module';

const MODULE_LOADER = [
  AuthModule,
  InfraModule,
  CoreModule,
  PluginModule
]

@Module({
  imports: MODULE_LOADER,
})
export class BootstrapModule { }
