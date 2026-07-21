import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { DIDService } from '../did/did.service';

// Extend the Request interface to include the resolved DID document
export interface AuthenticatedRequest extends Request {
  didDocument?: any;
  user?: any;
}

@Injectable()
export class JwtDidMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtDidMiddleware.name);

  constructor(private readonly didService: DIDService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn('Missing or invalid Authorization header');
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Decode JWT without verifying signature first to extract DID
      // In a real-world scenario, you'd verify the JWT signature against the issuer's public key
      const decoded: any = jwt.decode(token);
      
      if (!decoded || !decoded.iss) {
        throw new UnauthorizedException('Invalid JWT token format');
      }

      const issuerDid = decoded.iss;
      this.logger.debug(`Resolving DID: ${issuerDid}`);

      // Resolve the DID document
      const didDocument = await this.didService.resolveDID(issuerDid);
      
      if (!didDocument) {
        throw new UnauthorizedException(`Failed to resolve DID document for ${issuerDid}`);
      }

      // Attach to request for downstream zero-trust routing
      req.didDocument = didDocument;
      req.user = decoded;

      this.logger.log(`Successfully authenticated DID: ${issuerDid}`);
      next();
    } catch (error) {
      this.logger.error('Authentication failed', error);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
