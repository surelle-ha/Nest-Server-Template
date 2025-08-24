import { Module } from '@nestjs/common';

const MODULE_LOADER = [

]

@Module({
  imports: MODULE_LOADER,
})
export class AuthModule { }
