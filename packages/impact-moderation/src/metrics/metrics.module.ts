import { Module } from '@nestjs/common';
import { IrisEngine } from './iris-engine';

/**
 * MetricsModule provides tools for calculating and aggregating impact metrics.
 */
@Module({
  providers: [IrisEngine],
  exports: [IrisEngine],
})
export class MetricsModule {}
