import { Injectable, Logger } from '@nestjs/common';

export interface SyncOperation {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: any;
  timestamp: number;
  clientId: string;
  entityId: string;
  entityType: string;
}

export interface ConflictResolution {
  entityId: string;
  resolvedWinner: 'SERVER' | 'CLIENT';
  mergedPayload?: any;
}

/**
 * SyncService implements the core logic for offline data synchronization.
 * 
 * CAP Theorem Considerations (AP System):
 * In a mobile-first environment like Akoka Solve, network partitions (P) are frequent.
 * We prioritize Availability (A) by allowing offline writes on the mobile client.
 * This sacrifices immediate Consistency (C) in favor of Eventual Consistency.
 * We resolve eventual conflicts using Last-Writer-Wins (LWW) and vector clocks.
 */
@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  // Mock server state for last sync timestamps per client
  private clientSyncState: Map<string, number> = new Map();

  // Mock server entities for conflict resolution simulation
  private serverEntities: Map<string, { timestamp: number, payload: any }> = new Map();

  /**
   * Process a batch of offline queue items from a client.
   * 
   * @param operations Array of sync operations
   * @returns Result of synchronization including applied items and conflicts
   */
  async processBatch(operations: SyncOperation[]) {
    let synced = 0;
    const conflicts: ConflictResolution[] = [];

    for (const op of operations) {
      if (this.detectConflict(op)) {
        const resolution = this.resolveConflict(op);
        conflicts.push(resolution);
        
        if (resolution.resolvedWinner === 'CLIENT') {
          this.applyOperation(op);
          synced++;
        }
      } else {
        this.applyOperation(op);
        synced++;
      }
    }

    if (operations.length > 0) {
      this.updateLastSyncStatus(operations[0].clientId, Date.now());
    }

    return {
      synced,
      conflicts
    };
  }

  /**
   * Detects if there is a conflict between server state and client operation.
   * Compares the operation timestamp with the last known server update for the entity.
   */
  private detectConflict(op: SyncOperation): boolean {
    const serverEntity = this.serverEntities.get(op.entityId);
    if (!serverEntity) {
      return false; // No server entity, no conflict
    }
    
    // Conflict exists if server was updated after the client's last sync,
    // or if the client operation is older than the server state
    return serverEntity.timestamp > op.timestamp;
  }

  /**
   * CRDT-based conflict resolution using Last-Writer-Wins.
   * In a real implementation, vector clocks should be used for more precise merging.
   */
  private resolveConflict(op: SyncOperation): ConflictResolution {
    const serverEntity = this.serverEntities.get(op.entityId);
    
    // Last-Writer-Wins
    if (serverEntity && serverEntity.timestamp > op.timestamp) {
      this.logger.debug(`Conflict resolved: SERVER wins for entity ${op.entityId}`);
      return {
        entityId: op.entityId,
        resolvedWinner: 'SERVER',
        mergedPayload: serverEntity.payload
      };
    }

    this.logger.debug(`Conflict resolved: CLIENT wins for entity ${op.entityId}`);
    return {
      entityId: op.entityId,
      resolvedWinner: 'CLIENT',
      mergedPayload: op.payload
    };
  }

  private applyOperation(op: SyncOperation) {
    // Apply to local DB store (mocked here)
    if (op.action !== 'DELETE') {
      this.serverEntities.set(op.entityId, { timestamp: op.timestamp, payload: op.payload });
    } else {
      this.serverEntities.delete(op.entityId);
    }
  }

  /**
   * Gets the last sync status for a client.
   */
  getLastSyncStatus(clientId: string): number {
    return this.clientSyncState.get(clientId) || 0;
  }

  private updateLastSyncStatus(clientId: string, timestamp: number) {
    this.clientSyncState.set(clientId, timestamp);
  }
}
