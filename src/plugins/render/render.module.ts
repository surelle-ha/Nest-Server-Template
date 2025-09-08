import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RenderService } from './render.service';

@Global()
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [RenderService],
})
export class RenderModule { }
