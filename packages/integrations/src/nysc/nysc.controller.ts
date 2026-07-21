import { Controller, Put, Body, Headers, UnauthorizedException, RawBodyRequest, Req, Logger } from '@nestjs/common';
import { NyscService } from './nysc.service';

@Controller('v1/nysc')
export class NyscController {
  private readonly logger = new Logger(NyscController.name);

  constructor(private readonly nyscService: NyscService) {}

  /**
   * Webhook receiving NYSC CDS hour updates
   */
  @Put('status')
  async updateStatus(
    @Req() req: RawBodyRequest<Request>,
    @Headers('x-nysc-signature') signature: string,
    @Body() payload: { userId: string; hours: number; verificationCode: string }
  ) {
    const rawPayload = req.rawBody?.toString() || JSON.stringify(payload);
    const secret = process.env.NYSC_WEBHOOK_SECRET || 'default_secret';

    if (!signature || !this.nyscService.validateHmacSignature(rawPayload, signature, secret)) {
      this.logger.warn('Invalid NYSC webhook signature');
      throw new UnauthorizedException('Invalid HMAC signature');
    }

    await this.nyscService.syncCDSHours(payload.userId, payload.hours, payload.verificationCode);
    return { success: true };
  }
}
