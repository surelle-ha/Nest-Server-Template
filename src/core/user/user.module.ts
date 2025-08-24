import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { User } from './user.model';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';

@Module({
    imports: [SequelizeModule.forFeature([User]), CqrsModule],
    controllers: [UserController],
    providers: [CreateUserHandler, GetUserHandler],
})
export class UserModule { }
