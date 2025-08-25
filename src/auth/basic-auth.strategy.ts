import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy, 'basic-auth') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('APP_SECRET') || 'defaultSecret',
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email };
    }
}
