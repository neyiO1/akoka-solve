import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncBatchDto } from './dto/sync-batch.dto';

/**
 * SyncController handles mobile offline synchronization endpoints.
 */
@Controller('v1/sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  /**
   * Receives a batch of offline operations from mobile IndexedDB.
   * Resolves conflicts using Last-Writer-Wins and vector clocks.
   * 
   * @param batch Encrypted payloads of operations
   * @returns Sync result including number of synced items and resolved conflicts
   */
  @Post()
  async syncBatch(@Body() batch: SyncBatchDto) {
    return this.syncService.processBatch(batch.operations);
  }

  /**
   * Returns the last successful sync timestamp for a specific user client.
   * 
   * @param clientId Client device identifier
   * @returns Timestamp of last sync
   */
  @Get('status')
  async getSyncStatus(@Query('clientId') clientId: string) {
    return { lastSync: this.syncService.getLastSyncStatus(clientId) };
  }
}
