import { DynamicModule, Module, Provider, OnModuleInit, Logger } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions, getConnectionToken } from '@nestjs/sequelize';
import { SuperObserveInterceptor } from './super-observe.interceptor';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { SuperObserve } from './super-observe.model';

@Module({})
export class SuperObserveModule implements OnModuleInit {
    private readonly logger = new Logger(SuperObserveModule.name);

    constructor(private readonly sequelize: Sequelize) { }

    static forRoot(): DynamicModule {
        const interceptorProvider: Provider = {
            provide: APP_INTERCEPTOR,
            useFactory: (reflector: Reflector) => new SuperObserveInterceptor(reflector),
            inject: [Reflector],
        };

        return {
            module: SuperObserveModule,
            imports: [SequelizeModule.forFeature([SuperObserve])],
            providers: [interceptorProvider],
            exports: [],
        };
    }

    async onModuleInit() {
        try {
            await this.sequelize.addModels([SuperObserve]);
            await this.sequelize.sync({ alter: true });
            this.logger.log('SuperObserve table synced successfully.');
        } catch (err) {
            this.logger.error('Failed to sync SuperObserve table', err);
        }
    }
}
