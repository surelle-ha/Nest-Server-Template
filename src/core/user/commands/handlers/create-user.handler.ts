import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../user.model';
import { CreateUserCommand } from '../create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async execute(command: CreateUserCommand): Promise<User> {
        const user = command.data;
        return this.userModel.create(user as unknown as User);
    }
}
