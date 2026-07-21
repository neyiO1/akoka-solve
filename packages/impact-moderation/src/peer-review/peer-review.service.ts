import { Injectable, Logger } from '@nestjs/common';

export interface ReviewSubmission {
  reviewerId: string;
  approved: boolean;
  feedback?: string;
  timestamp: number;
}

export interface ConsensusResult {
  reached: boolean;
  approvals: number;
  rejections: number;
  isApproved?: boolean;
}

/**
 * PeerReviewService handles the assignment and consensus logic for decentralized task verification.
 */
@Injectable()
export class PeerReviewService {
  private readonly logger = new Logger(PeerReviewService.name);

  // In-memory store for mock implementations
  private taskReviews: Map<string, ReviewSubmission[]> = new Map();

  /**
   * Assigns reviewers to a task proof using consistent hashing (mocked via random selection here).
   * Selects 2 Tier-2 peers and 1 mentor for moderation.
   * 
   * @param taskProofId The ID of the proof being reviewed
   * @returns Array of assigned reviewer IDs
   */
  async assignReviewers(taskProofId: string): Promise<string[]> {
    // Mock implementation of consistent hashing selection
    // In production, use a consistent hash ring with virtual nodes to distribute load uniformly
    const peers = [`peer_t2_${Math.floor(Math.random() * 1000)}`, `peer_t2_${Math.floor(Math.random() * 1000)}`];
    const mentor = `mentor_${Math.floor(Math.random() * 100)}`;
    
    const assigned = [...peers, mentor];
    this.logger.log(`Assigned reviewers for task ${taskProofId}: ${assigned.join(', ')}`);
    
    // Initialize review tracking
    if (!this.taskReviews.has(taskProofId)) {
      this.taskReviews.set(taskProofId, []);
    }

    return assigned;
  }

  /**
   * Submits a review from an assigned reviewer.
   * 
   * @param reviewerId ID of the reviewer submitting
   * @param taskProofId ID of the task proof being reviewed
   * @param approved Whether the proof is approved or rejected
   * @param feedback Optional feedback string
   */
  async submitReview(reviewerId: string, taskProofId: string, approved: boolean, feedback?: string): Promise<ConsensusResult> {
    const reviews = this.taskReviews.get(taskProofId) || [];
    
    // Check if already reviewed (idempotency check)
    if (reviews.find(r => r.reviewerId === reviewerId)) {
      this.logger.warn(`Reviewer ${reviewerId} already submitted review for ${taskProofId}`);
      return this.checkConsensus(taskProofId);
    }

    reviews.push({
      reviewerId,
      approved,
      feedback,
      timestamp: Date.now()
    });

    this.taskReviews.set(taskProofId, reviews);
    this.logger.log(`Review submitted for ${taskProofId} by ${reviewerId}. Approved: ${approved}`);

    return this.checkConsensus(taskProofId);
  }

  /**
   * Evaluates if consensus has been reached on a task proof.
   * BFT-inspired threshold: Requires agreement from 2 peers + 1 mentor,
   * or a simple majority threshold depending on strictness.
   * Here we implement: Needs at least 3 reviews, with majority winning.
   * 
   * @param taskProofId ID of the task proof
   */
  async checkConsensus(taskProofId: string): Promise<ConsensusResult> {
    const reviews = this.taskReviews.get(taskProofId) || [];
    
    const approvals = reviews.filter(r => r.approved).length;
    const rejections = reviews.filter(r => !r.approved).length;
    const totalReviews = approvals + rejections;

    // Threshold: Need 3 reviews to reach consensus
    if (totalReviews < 3) {
      return {
        reached: false,
        approvals,
        rejections
      };
    }

    const isApproved = approvals > rejections;
    this.logger.log(`Consensus reached for ${taskProofId}: ${isApproved ? 'APPROVED' : 'REJECTED'}`);

    return {
      reached: true,
      approvals,
      rejections,
      isApproved
    };
  }
}
