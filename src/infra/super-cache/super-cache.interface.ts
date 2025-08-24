export interface RedisOptions {
    host: string;
    port: number;
    password?: string;
    ttl?: number;
}

export interface FileOptions {
    path: string;
    ttl?: number;
}

export interface DatabaseOptions {
    sequelize: import('sequelize-typescript').Sequelize;
    ttl?: number;
    autoSync?: boolean;
}

export interface MemoryOptions {
    ttl?: number;
    maxSize?: number;
}

export interface ExtraSetOptions {
    ttl?: number;
}

export type XStoredItem = {
    value: any;
    expiresAt?: number;
};

export type SuperCacheModuleOptions =
    | { driver: 'redis'; driverOptions: RedisOptions }
    | { driver: 'file'; driverOptions: FileOptions }
    | { driver: 'database'; driverOptions: DatabaseOptions }
    | { driver: 'memory'; driverOptions: MemoryOptions };

export interface CacheDriver {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ExtraSetOptions): Promise<void>;
    del(key: string): Promise<void>;
    getAll<T = any>(pattern?: string): Promise<Record<string, T>>;
    delAll<T = any>(pattern?: string): Promise<Record<string, T>>;
}
