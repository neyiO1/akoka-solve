import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

/**
 * Service to interact with Redis for caching purposes.
 * Implements Cache-Aside pattern.
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private redisClient: Redis;

  onModuleInit() {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    this.redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
    });

    this.redisClient.on('connect', () => {
      this.logger.log('Connected to Redis');
    });

    this.redisClient.on('error', (err) => {
      this.logger.error('Redis connection error', err);
    });
  }

  onModuleDestroy() {
    if (this.redisClient) {
      this.redisClient.quit();
    }
  }

  /**
   * Get a value from the cache.
   * @param key The cache key
   * @returns The parsed JSON value or null
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redisClient.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      this.logger.error(`Error getting key ${key} from Redis`, error);
      return null;
    }
  }

  /**
   * Set a value in the cache.
   * @param key The cache key
   * @param value The value to cache
   * @param ttl Time to live in seconds (optional)
   */
  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        // We use string 'EX' specifically since it's the valid value for the set command with expiration
        await this.redisClient.set(key, serializedValue, 'EX', ttl);
      } else {
        await this.redisClient.set(key, serializedValue);
      }
    } catch (error) {
      this.logger.error(`Error setting key ${key} in Redis`, error);
    }
  }

  /**
   * Delete a key from the cache.
   * @param key The cache key to delete
   */
  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      this.logger.error(`Error deleting key ${key} from Redis`, error);
    }
  }

  /**
   * Cache-Aside pattern implementation: Get from cache, or fetch, cache, and return.
   * @param key The cache key
   * @param fetcher Function to fetch data if cache miss
   * @param ttl Time to live in seconds
   * @returns The data
   */
  async getOrSet<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T> {
    const cachedData = await this.get<T>(key);
    if (cachedData) {
      return cachedData;
    }

    const fetchedData = await fetcher();
    if (fetchedData !== undefined && fetchedData !== null) {
      await this.set(key, fetchedData, ttl);
    }
    return fetchedData;
  }

  /**
   * Invalidate cache keys matching a pattern.
   * Useful for pattern-based cache busting.
   * @param pattern The pattern to match (e.g., 'user:*')
   */
  async invalidate(pattern: string): Promise<void> {
    try {
      const keys = await this.redisClient.keys(pattern);
      if (keys.length > 0) {
        await this.redisClient.del(...keys);
        this.logger.log(`Invalidated ${keys.length} keys matching pattern ${pattern}`);
      }
    } catch (error) {
      this.logger.error(`Error invalidating pattern ${pattern} in Redis`, error);
    }
  }
}
