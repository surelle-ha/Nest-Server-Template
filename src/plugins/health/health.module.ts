import { Global, Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Global()
@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule { }
