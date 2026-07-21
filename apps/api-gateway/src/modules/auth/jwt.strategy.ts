import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * JWT strategy for authenticating requests.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret', // Use ConfigService in production
    });
  }

  /**
   * Validates the JWT payload.
   * @param payload - The decoded JWT payload
   * @returns The validated user object
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
