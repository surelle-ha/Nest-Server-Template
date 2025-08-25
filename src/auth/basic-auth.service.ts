import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/core/user/user.model';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class BasicAuthService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userModel.scope('withPassword').findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        return user;
    }

    async login(dto: LoginDto): Promise<{ accessToken: string; user: any }> {
        const user = await this.validateUser(dto.email, dto.password);

        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        const { password, ...result } = user.get({ plain: true });
        return { accessToken, user: result };
    }
}
