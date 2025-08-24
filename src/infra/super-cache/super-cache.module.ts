import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  RedisDriver,
  MemoryDriver,
  FileDriver,
  DatabaseDriver,
} from './super-cache.driver';
import {
  CacheDriver,
  SuperCacheModuleOptions,
} from './super-cache.interface';
import { SuperCacheService } from './super-cache.service';

const DRIVER_TOKEN = 'SUPER_CACHE_DRIVER';

@Global()
@Module({})
export class SuperCacheModule {
  static forRoot(options: SuperCacheModuleOptions): DynamicModule {
    const DRIVER_TOKEN = `SUPER_CACHE_DRIVER::${options.driver.toUpperCase()}`;

    const driverProvider: Provider = {
      provide: DRIVER_TOKEN,
      useFactory: () => {
        switch (options.driver) {
          case 'redis':
            return new RedisDriver(options.driverOptions);
          case 'database':
            return new DatabaseDriver(options.driverOptions);
          case 'file':
            return new FileDriver(options.driverOptions);
          case 'memory':
          default:
            return new MemoryDriver(options.driverOptions);
        }
      },
    };

    const cacheServiceProvider: Provider = {
      provide: `SUPER_CACHE_${options.driver.toUpperCase()}_DRIVER`,
      useFactory: (driver: CacheDriver) => new SuperCacheService(driver),
      inject: [DRIVER_TOKEN],
    };

    return {
      module: SuperCacheModule,
      providers: [driverProvider, cacheServiceProvider],
      exports: [cacheServiceProvider],
    };
  }
}
