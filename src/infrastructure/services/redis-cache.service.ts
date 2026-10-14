import { inject, injectable } from 'tsyringe';
import { ICacheService } from '../../application/interfaces/services/cache.service.interface';
import { TOKENS } from '../di/tokens';
import Redis from 'ioredis';

@injectable()
export class RedisCacheService implements ICacheService {
  constructor(
    @inject(TOKENS.RedisClient)
    private readonly redis: Redis,
  ) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, ttl: number, value: string): Promise<void> {
    await this.redis.setex(key, ttl, value);
  }

  async delete(...keys: string[]): Promise<void> {
    if (keys.length === 0) return;
    await this.redis.del(...keys);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  async ttl(key: string): Promise<number> {
    return await this.redis.ttl(key);
  }
}
