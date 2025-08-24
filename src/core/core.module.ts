import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

const MODULE_LOADER = [
    UserModule
]

@Module({
    imports: MODULE_LOADER,
})
export class CoreModule { }
