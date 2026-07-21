import { Injectable, Logger } from '@nestjs/common';

/**
 * NotificationsService wraps Firebase Cloud Messaging to handle push notifications.
 */
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  
  // Mock device registry mapping userId -> fcmToken
  private deviceRegistry: Map<string, string> = new Map();

  /**
   * Registers a user's device for FCM push notifications.
   * 
   * @param userId The user's unique identifier
   * @param fcmToken The Firebase Cloud Messaging token for the device
   */
  async registerDevice(userId: string, fcmToken: string): Promise<void> {
    this.deviceRegistry.set(userId, fcmToken);
    this.logger.log(`Device registered for user: ${userId}`);
  }

  /**
   * Sends a push notification to a single user.
   * 
   * @param userId The recipient's user ID
   * @param title Notification title
   * @param body Notification body content
   */
  async sendPush(userId: string, title: string, body: string): Promise<boolean> {
    const token = this.deviceRegistry.get(userId);
    if (!token) {
      this.logger.warn(`No FCM token found for user: ${userId}`);
      return false;
    }
    
    // Simulate FCM send
    this.logger.log(`Push sent to ${userId}: [${title}] ${body}`);
    return true;
  }

  /**
   * Sends a push notification to multiple users simultaneously.
   * 
   * @param userIds Array of recipient user IDs
   * @param title Notification title
   * @param body Notification body content
   */
  async sendBulk(userIds: string[], title: string, body: string): Promise<number> {
    let successCount = 0;
    
    // Simulate parallel sending via Promise.all
    const promises = userIds.map(async (userId) => {
      const success = await this.sendPush(userId, title, body);
      if (success) successCount++;
    });

    await Promise.all(promises);
    return successCount;
  }
}
