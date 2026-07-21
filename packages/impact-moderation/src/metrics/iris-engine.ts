export interface SocialOutcome {
  metricId: string;
  value: number;
}

export interface ImpactMetrics {
  totalSROI: number;
  sdgContributions: Record<string, number>;
  verifiedTasks: number;
}

/**
 * IrisEngine aggregates impact metrics using IRIS+ standards and maps them to SDGs.
 */
export class IrisEngine {
  /**
   * Maps an internal task category to a standard SDG (Sustainable Development Goal) indicator.
   * 
   * @param taskCategory The Akoka Solve task category
   * @returns The corresponding SDG indicator string or UNKNOWN
   */
  mapToSDG(taskCategory: string): string {
    const sdgMap: Record<string, string> = {
      'EDUCATION': 'SDG_4', // Quality Education
      'ENVIRONMENT': 'SDG_13', // Climate Action
      'HEALTH': 'SDG_3', // Good Health and Well-being
      'POVERTY': 'SDG_1', // No Poverty
      'WATER': 'SDG_6', // Clean Water and Sanitation
    };

    return sdgMap[taskCategory.toUpperCase()] || 'UNKNOWN';
  }

  /**
   * Calculates the Social Return on Investment (SROI) ratio.
   * 
   * @param investmentAmount Total monetary value invested (e.g., token rewards)
   * @param socialOutcomes Array of quantified social outcomes
   * @returns SROI ratio (Value generated per unit invested)
   */
  calculateSROI(investmentAmount: number, socialOutcomes: SocialOutcome[]): number {
    if (investmentAmount <= 0) return 0;

    // Simple mock calculation: sum of outcome values / investment
    // In reality, each outcome needs a financial proxy applied based on IRIS+ metrics.
    const totalImpactValue = socialOutcomes.reduce((acc, outcome) => acc + outcome.value, 0);
    
    // Return rounded ratio
    return Math.round((totalImpactValue / investmentAmount) * 100) / 100;
  }

  /**
   * Aggregates total impact metrics for a specific user.
   * 
   * @param userId The ID of the user
   * @returns Aggregated impact metrics
   */
  async aggregateImpact(userId: string): Promise<ImpactMetrics> {
    // In a real scenario, this would query the DB for all verified tasks by the user
    // Mock data for demonstration:
    return {
      totalSROI: 3.5, // E.g., $3.50 of social value created for every $1 invested
      sdgContributions: {
        'SDG_4': 12,
        'SDG_13': 5
      },
      verifiedTasks: 17
    };
  }
}
