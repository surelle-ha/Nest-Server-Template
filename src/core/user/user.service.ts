import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.userModel.create({
            ...dto,
            password: hashedPassword,
        } as any);
        const { password, ...result } = user.get({ plain: true });
        return result as User;
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userModel.findByPk(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ where: { email } });
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        await user.update(dto);
        return user;
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}
