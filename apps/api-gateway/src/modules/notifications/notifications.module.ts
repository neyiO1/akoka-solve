import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

/**
 * NotificationsModule manages push notifications.
 */
@Module({
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
