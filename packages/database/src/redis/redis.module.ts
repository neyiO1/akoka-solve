import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

/**
 * Global module to provide Redis cache service across the application.
 */
@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
