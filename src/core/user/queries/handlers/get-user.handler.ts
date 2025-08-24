import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../user.model';
import { GetUserQuery } from '../get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async execute(query: GetUserQuery): Promise<User | null> {
        return this.userModel.findByPk(query.id);
    }
}
