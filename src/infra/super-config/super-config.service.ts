import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperConfigOptions } from './super-config.interface';
import { SuperConfigDefaults } from './super-config.default';

@Injectable()
export class SuperConfigService {
    constructor(private readonly configService: ConfigService) { }

    private convertBoolean(value: any): boolean {
        return value === true || value === 'true' || value === 1 || value === '1';
    }

    get env(): SuperConfigOptions {
        return {
            // App VARIABLES
            APP_NAME: this.configService.get<string>('APP_NAME', SuperConfigDefaults.APP_NAME),
            APP_ENV: this.configService.get<string>('APP_ENV', SuperConfigDefaults.APP_ENV),
            APP_HOST: this.configService.get<string>('APP_HOST', SuperConfigDefaults.APP_HOST),
            APP_PORT: this.configService.get<number>('APP_PORT', SuperConfigDefaults.APP_PORT),
            APP_DEBUG: this.convertBoolean(this.configService.get<boolean>('APP_DEBUG', SuperConfigDefaults.APP_DEBUG)),
            APP_SECRET: this.configService.get<string>('APP_SECRET', SuperConfigDefaults.APP_SECRET),
            APP_TIMEZONE: this.configService.get<string>('APP_TIMEZONE', SuperConfigDefaults.APP_TIMEZONE),
            APP_CLIENT_URL: this.configService.get<string>('APP_CLIENT_URL', SuperConfigDefaults.APP_CLIENT_URL),

            // Auth Variables
            AUTH_LIFETIME: this.configService.get<number>('AUTH_LIFETIME', SuperConfigDefaults.AUTH_LIFETIME),
            AUTH_SALTROUND: this.configService.get<number>('AUTH_SALTROUND', SuperConfigDefaults.AUTH_SALTROUND),

            // Database Variables
            DATABASE_TYPE: this.configService.get<string>('DATABASE_TYPE', SuperConfigDefaults.DATABASE_TYPE),
            DATABASE_HOST: this.configService.get<string>('DATABASE_HOST', SuperConfigDefaults.DATABASE_HOST),
            DATABASE_PORT: this.configService.get<number>('DATABASE_PORT', SuperConfigDefaults.DATABASE_PORT),
            DATABASE_NAME: this.configService.get<string>('DATABASE_NAME', SuperConfigDefaults.DATABASE_NAME),
            DATABASE_USERNAME: this.configService.get<string>('DATABASE_USERNAME', SuperConfigDefaults.DATABASE_USERNAME),
            DATABASE_PASSWORD: this.configService.get<string>('DATABASE_PASSWORD', SuperConfigDefaults.DATABASE_PASSWORD),
            DATABASE_SSL: this.convertBoolean(this.configService.get<boolean>('DATABASE_SSL', SuperConfigDefaults.DATABASE_SSL)),
            DATABASE_DEBUG: this.convertBoolean(this.configService.get<boolean>('DATABASE_DEBUG', SuperConfigDefaults.DATABASE_DEBUG)),

            // Redis Variables
            REDIS_HOST: this.configService.get<string>('REDIS_HOST', SuperConfigDefaults.REDIS_HOST),
            REDIS_PORT: this.configService.get<number>('REDIS_PORT', SuperConfigDefaults.REDIS_PORT),
            REDIS_USERNAME: this.configService.get<string>('REDIS_USERNAME', SuperConfigDefaults.REDIS_USERNAME),
            REDIS_PASSWORD: this.configService.get<string>('REDIS_PASSWORD', SuperConfigDefaults.REDIS_PASSWORD),
            REDIS_TTL: this.configService.get<number>('REDIS_TTL', SuperConfigDefaults.REDIS_TTL),

            // Mailer Variables
            MAILER_HOST: this.configService.get<string>('MAILER_HOST', SuperConfigDefaults.MAILER_HOST),
            MAILER_PORT: this.configService.get<number>('MAILER_PORT', SuperConfigDefaults.MAILER_PORT),
            MAILER_USERNAME: this.configService.get<string>('MAILER_USERNAME', SuperConfigDefaults.MAILER_USERNAME),
            MAILER_PASSWORD: this.configService.get<string>('MAILER_PASSWORD', SuperConfigDefaults.MAILER_PASSWORD),
            MAILER_SECURE: this.convertBoolean(this.configService.get<boolean>('MAILER_SECURE', SuperConfigDefaults.MAILER_SECURE)),

            // Config Variables
            ENABLE_HELMET: this.convertBoolean(this.configService.get<boolean>('ENABLE_HELMET', SuperConfigDefaults.ENABLE_HELMET)),
            ENABLE_CORS: this.convertBoolean(this.configService.get<boolean>('ENABLE_CORS', SuperConfigDefaults.ENABLE_CORS)),
            ENABLE_COMPRESSION: this.convertBoolean(this.configService.get<boolean>('ENABLE_COMPRESSION', SuperConfigDefaults.ENABLE_COMPRESSION)),
            ENABLE_UNDER_PRESSURE: this.convertBoolean(this.configService.get<boolean>('ENABLE_UNDER_PRESSURE', SuperConfigDefaults.ENABLE_UNDER_PRESSURE)),
            ENABLE_SHUTDOWN_HOOKS: this.convertBoolean(this.configService.get<boolean>('ENABLE_SHUTDOWN_HOOKS', SuperConfigDefaults.ENABLE_SHUTDOWN_HOOKS)),
        }
    }
}
