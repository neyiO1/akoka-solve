import { Module } from '@nestjs/common';
import { PeerReviewService } from './peer-review.service';

/**
 * PeerReviewModule handles decentralized peer review and moderation.
 */
@Module({
  providers: [PeerReviewService],
  exports: [PeerReviewService],
})
export class PeerReviewModule {}
