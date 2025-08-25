import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BasicAuthService } from './basic-auth.service';
import { BasicAuthController } from './basic-auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/core/user/user.model';
import { UserService } from 'src/core/user/user.service';
import { BasicAuthStrategy } from './basic-auth.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('APP_SECRET') || 'defaultSecret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [BasicAuthController],
  providers: [BasicAuthService, UserService, BasicAuthStrategy],
})
export class BasicAuthModule { }
