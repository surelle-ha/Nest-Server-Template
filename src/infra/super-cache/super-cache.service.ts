import { Inject, Injectable } from '@nestjs/common';
import { CacheDriver, ExtraSetOptions } from './super-cache.interface';

@Injectable()
export class SuperCacheService {
  constructor(
    @Inject('SUPER_CACHE_DRIVER') private readonly driver: CacheDriver,
  ) { }

  //** MAINTENANCE */
  async clear(): Promise<Record<string, any>> {
    return this.driver.delAll('*');
  }

  async getDriver(): Promise<CacheDriver> {
    return this.driver;
  }

  async getStats(): Promise<Record<string, any>> {
    return {
      driver: this.driver.constructor.name,
      options: this.driver['options'] || {},
      size: await this.driver.getAll().then(items => Object.keys(items).length),
      keys: await this.driver.getAll().then(items => Object.keys(items))
    };
  }

  //** KEY MANAGEMENT */
  async get<T>(key: string): Promise<T | null> {
    return this.driver.get<T>(key);
  }

  async set<T>(key: string, value: T, extraSetOptions: ExtraSetOptions): Promise<void> {
    return this.driver.set<T>(key, value, extraSetOptions);
  }

  async del(key: string): Promise<void> {
    return this.driver.del(key);
  }

  async has(key: string): Promise<boolean> {
    const value = await this.driver.get(key);
    return value !== null;
  }

  //** ADVANCE KEY MANAGEMENT */
  async getOrSet<T>(key: string, value: T, extraSetOptions: ExtraSetOptions): Promise<T> {
    const cachedValue = await this.get<T>(key);
    if (cachedValue !== null) {
      return cachedValue;
    }
    await this.set(key, value, extraSetOptions);
    return value;
  }

  //** BULK KEY MANAGEMENT */
  async getAll<T = any>(pattern?: string): Promise<Record<string, T>> {
    return this.driver.getAll<T>(pattern);
  }

  async delAll<T = any>(pattern?: string): Promise<Record<string, T>> {
    return this.driver.delAll<T>(pattern);
  }
}
