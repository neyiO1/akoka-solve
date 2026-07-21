import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * Custom Rate Limit Middleware/Guard extending ThrottlerGuard.
 */
@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    return new Promise((resolve) => resolve(req.ips.length ? req.ips[0] : req.ip));
  }
}
