import { Module } from '@nestjs/common';
import { UmzugService } from './umzug.service';

@Module({
    providers: [UmzugService],
    exports: [UmzugService],
})
export class UmzugModule { }
