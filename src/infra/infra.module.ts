import { Global, Module } from '@nestjs/common';
import { SuperConfigModule } from './super-config/super-config.module';
import { SuperConfigService } from './super-config/super-config.service';
import { SuperServerModule } from './super-server/super-server.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UmzugModule } from './umzug/umzug.module';
import { SuperCacheModule } from './super-cache/super-cache.module';
import { User } from 'src/core/user/user.model';
import { SuperObserveModule } from './super-observe/super-observe.module';

const MODULE_LOADER = [
    SuperObserveModule.forRoot(),
    SuperConfigModule,
    SuperCacheModule.forRoot({
        driver: 'file',
        driverOptions: {
            path: './storage/cache.json',
            ttl: 60
        }
    }),
    SequelizeModule.forRootAsync({
        imports: [SuperConfigModule],
        inject: [SuperConfigService],
        useFactory: (configService: SuperConfigService) => ({
            dialect: 'postgres',
            host: configService.env.DATABASE_HOST,
            port: configService.env.DATABASE_PORT,
            username: configService.env.DATABASE_USERNAME,
            password: configService.env.DATABASE_PASSWORD,
            database: configService.env.DATABASE_NAME,
            logging: configService.env.DATABASE_DEBUG,
            autoLoadModels: false,
            synchronize: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            models: [User],
        }),
    }),
    SuperServerModule,
    UmzugModule,
]

@Global()
@Module({
    imports: MODULE_LOADER,
})
export class InfraModule { }
