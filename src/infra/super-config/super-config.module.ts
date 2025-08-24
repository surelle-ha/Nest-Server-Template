
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SuperConfigService } from './super-config.service';

@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [SuperConfigService],
    exports: [SuperConfigService],
})
export class SuperConfigModule { }
