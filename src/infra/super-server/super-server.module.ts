
import { Module } from '@nestjs/common';
import { SuperServerService } from './super-server.service';
import { SuperServerController } from './super-server.controller';

@Module({
    controllers: [SuperServerController],
    providers: [SuperServerService],
    exports: [SuperServerService],
})
export class SuperServerModule { }
