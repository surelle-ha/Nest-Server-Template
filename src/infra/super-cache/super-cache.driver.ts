import { SuperCache } from './super-cache.entity';
import { Op } from 'sequelize';
import { CacheDriver, DatabaseOptions, ExtraSetOptions, FileOptions, MemoryOptions, RedisOptions, XStoredItem } from './super-cache.interface';
import { promises as fs } from 'fs';
import * as path from 'path';
import Redis from 'ioredis';

export class RedisDriver implements CacheDriver {
    private client: Redis;
    private ttl?: number;

    constructor(private options: RedisOptions) {
        this.client = new Redis({
            host: options.host,
            port: options.port,
            password: options.password,
        });
        this.ttl = options.ttl;
    }

    async get<T>(key: string): Promise<T | null> {
        const raw = await this.client.get(key);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as T;
        } catch {
            return raw as unknown as T;
        }
    }

    async set<T>(key: string, value: T, extraSetOption: ExtraSetOptions): Promise<void> {
        const effectiveTtl = extraSetOption.ttl ?? this.ttl;
        const json = JSON.stringify(value);
        if (typeof effectiveTtl === 'number') {
            await this.client.set(key, json, 'EX', effectiveTtl);
        } else {
            await this.client.set(key, json);
        }
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }

    async getAll<T = any>(pattern = '*'): Promise<Record<string, T>> {
        const keys: string[] = [];
        let cursor = '0';
        do {
            const [nextCursor, foundKeys] = await this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
            cursor = nextCursor;
            keys.push(...foundKeys);
        } while (cursor !== '0');
        if (keys.length === 0) return {};
        const values = await this.client.mget(...keys);
        const result: Record<string, T> = {};
        keys.forEach((key, i) => {
            try {
                result[key] = JSON.parse(values[i]!);
            } catch {
                result[key] = values[i] as unknown as T;
            }
        });
        return result;
    }

    async delAll<T = any>(pattern = '*'): Promise<Record<string, T>> {
        const keys = await this.getAll(pattern);
        const keyList = Object.keys(keys);
        if (keyList.length > 0) {
            await this.client.del(...keyList);
        }
        return keys;
    }
}

export class FileDriver implements CacheDriver {
    private filePath: string;
    private ttl?: number;

    constructor(private options: FileOptions) {
        this.filePath = path.resolve(options.path || './cache.json');
        this.ttl = options.ttl;
    }

    private async readStore(): Promise<Record<string, XStoredItem>> {
        try {
            const content = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(content);
        } catch (err) {
            return {};
        }
    }

    private async writeStore(store: Record<string, XStoredItem>): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(store, null, 2), 'utf8');
    }

    async get<T>(key: string): Promise<T | null> {
        const store = await this.readStore();
        const entry = store[key];
        if (!entry) return null;

        if (entry.expiresAt && Date.now() > entry.expiresAt) {
            delete store[key];
            await this.writeStore(store);
            return null;
        }

        return entry.value as T;
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        const store = await this.readStore();
        const effectiveTtl = ttl ?? this.ttl;

        const expiresAt = typeof effectiveTtl === 'number'
            ? Date.now() + effectiveTtl * 1000
            : undefined;

        store[key] = { value, expiresAt };
        await this.writeStore(store);
    }

    async del(key: string): Promise<void> {
        const store = await this.readStore();
        if (key in store) {
            delete store[key];
            await this.writeStore(store);
        }
    }

    async getAll<T = any>(pattern = '*'): Promise<Record<string, T>> {
        const store = await this.readStore();
        const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
        const result: Record<string, T> = {};
        for (const [key, item] of Object.entries(store)) {
            if (!regex.test(key)) continue;
            if (item.expiresAt && Date.now() > item.expiresAt) {
                delete store[key];
                continue;
            }
            result[key] = item.value as T;
        }
        await this.writeStore(store);
        return result;
    }

    async delAll<T = any>(pattern = '*'): Promise<Record<string, T>> {
        const store = await this.getAll(pattern);
        const keys = Object.keys(store);
        if (keys.length > 0) {
            const currentStore = await this.readStore();
            for (const key of keys) {
                delete currentStore[key];
            }
            await this.writeStore(currentStore);
        }
        return store;
    }
}

export class DatabaseDriver implements CacheDriver {
    private ttl: number | undefined;
    constructor(private options: DatabaseOptions) {
        this.ttl = options.ttl;
        options.sequelize.addModels([SuperCache]);
        if (options.autoSync !== false) {
            SuperCache.sync().catch(err => {
                console.error('[SuperCache] Failed to sync cache table:', err);
            });
        }
    }

    async get<T>(key: string): Promise<T | null> {
        const entry = await SuperCache.findByPk(key);
        if (!entry) return null;
        if (entry.expiresAt && Date.now() > entry.expiresAt) {
            await entry.destroy();
            return null;
        }
        try {
            return JSON.parse(entry.value) as T;
        } catch {
            return entry.value as unknown as T;
        }
    }

    async set<T>(key: string, value: T, extraSetOption?: ExtraSetOptions): Promise<void> {
        let expiresAt: number | undefined = undefined;
        const effectiveTtl = extraSetOption?.ttl ?? this.ttl;
        if (typeof effectiveTtl === 'number') {
            expiresAt = Date.now() + effectiveTtl * 1000;
        }
        await SuperCache.upsert({
            key,
            value: JSON.stringify(value),
            ...(expiresAt !== undefined ? { expiresAt } : {}),
        });
    }

    async del(key: string): Promise<void> {
        await SuperCache.destroy({ where: { key } });
    }

    async getAll<T = any>(pattern = '%'): Promise<Record<string, T>> {
        const where: any = {};
        if (pattern && pattern !== '*') {
            const pgPattern = pattern.replace(/\*/g, '%');
            where.key = { [Op.like]: pgPattern };
        }
        const entries = await SuperCache.findAll({ where });
        const result: Record<string, T> = {};
        for (const entry of entries) {
            if (entry.expiresAt && Date.now() > entry.expiresAt) {
                await entry.destroy();
                continue;
            }
            try {
                result[entry.key] = JSON.parse(entry.value);
            } catch {
                result[entry.key] = entry.value as unknown as T;
            }
        }
        return result;
    }

    async delAll<T = any>(pattern = '%'): Promise<Record<string, T>> {
        const keys = await this.getAll(pattern);
        const keyList = Object.keys(keys);
        if (keyList.length > 0) {
            await SuperCache.destroy({ where: { key: { [Op.in]: keyList } } });
        }
        return keys;
    }
}

export class MemoryDriver implements CacheDriver {
    private store = new Map<string, XStoredItem>();
    private ttl: number | undefined;
    private maxSize: number | undefined;

    constructor(private options: MemoryOptions = {}) {
        this.ttl = options.ttl;
        this.maxSize = options.maxSize;
    }

    async get<T>(key: string): Promise<T | null> {
        const item = this.store.get(key);
        if (!item) return null;
        if (item.expiresAt && Date.now() > item.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return item.value as T;
    }

    async set<T>(key: string, value: T, extraSetOptions: ExtraSetOptions): Promise<void> {
        const expiresAt = extraSetOptions.ttl || this.ttl
            ? Date.now() + ((extraSetOptions.ttl ?? this.ttl!) * 1000)
            : undefined;
        if (this.maxSize && this.store.size >= this.maxSize) {
            const firstKey = this.store.keys().next().value;
            if (firstKey) this.store.delete(firstKey);
        }
        this.store.set(key, { value, expiresAt });
    }

    async del(key: string): Promise<void> {
        this.store.delete(key);
    }

    async getAll<T = any>(pattern = '*'): Promise<Record<string, T>> {
        const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
        const result: Record<string, T> = {};
        for (const [key, item] of this.store.entries()) {
            if (!regex.test(key)) continue;
            if (item.expiresAt && Date.now() > item.expiresAt) {
                this.store.delete(key);
                continue;
            }
            result[key] = item.value as T;
        }
        return result;
    }

    async delAll<T = any>(pattern = '*'): Promise<Record<string, T>> {
        const keys = await this.getAll(pattern);
        const keyList = Object.keys(keys);
        for (const key of keyList) {
            this.store.delete(key);
        }
        return keys;
    }
}