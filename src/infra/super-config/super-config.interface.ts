export interface SuperConfigOptions {
    APP_NAME: string;
    APP_ENV: string;
    APP_HOST: string;
    APP_PORT: number;
    APP_DEBUG: boolean;
    APP_SECRET: string;
    APP_TIMEZONE: string;
    APP_CLIENT_URL: string;

    AUTH_LIFETIME: number;
    AUTH_SALTROUND: number;

    DATABASE_TYPE: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_NAME: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_SSL: boolean;
    DATABASE_DEBUG: boolean;

    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
    REDIS_TTL: number;

    MAILER_HOST: string;
    MAILER_PORT: number;
    MAILER_USERNAME: string;
    MAILER_PASSWORD: string;
    MAILER_SECURE: boolean;

    ENABLE_HELMET: boolean;
    ENABLE_CORS: boolean;
    ENABLE_COMPRESSION: boolean;
    ENABLE_UNDER_PRESSURE: boolean;
    ENABLE_SHUTDOWN_HOOKS: boolean;
}