import { SuperConfigOptions } from "./super-config.interface";

export const SuperConfigDefaults: SuperConfigOptions = {
    APP_NAME: 'default-api',
    APP_ENV: 'local',
    APP_HOST: '0.0.0.0',
    APP_PORT: 8000,
    APP_DEBUG: false,
    APP_SECRET: 'e12b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8',
    APP_TIMEZONE: 'UTC',
    APP_CLIENT_URL: 'localhost',

    AUTH_LIFETIME: 3600,
    AUTH_SALTROUND: 10,

    DATABASE_TYPE: 'postgres',
    DATABASE_HOST: 'localhost',
    DATABASE_PORT: 5432,
    DATABASE_NAME: 'default_db',
    DATABASE_USERNAME: 'user',
    DATABASE_PASSWORD: 'password',
    DATABASE_SSL: false,
    DATABASE_DEBUG: false,

    REDIS_HOST: 'localhost',
    REDIS_PORT: 6379,
    REDIS_USERNAME: '',
    REDIS_PASSWORD: '',
    REDIS_TTL: 3600,

    MAILER_HOST: 'smtp.example.com',
    MAILER_PORT: 587,
    MAILER_USERNAME: 'user@example.com',
    MAILER_PASSWORD: 'password',
    MAILER_SECURE: false,

    ENABLE_HELMET: true,
    ENABLE_CORS: true,
    ENABLE_COMPRESSION: true,
    ENABLE_UNDER_PRESSURE: true,
    ENABLE_SHUTDOWN_HOOKS: true,
    ENABLE_VIEW: true
};