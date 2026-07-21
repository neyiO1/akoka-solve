import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

interface RetryConfig {
  maxRetries: number;
  initialBackoff: number;
}

@Injectable()
export class WebhookDispatcherService {
  private readonly logger = new Logger(WebhookDispatcherService.name);

  /**
   * Sends a webhook with exponential backoff and jitter.
   * @param url The destination URL
   * @param payload The data to send
   * @param retryConfig Configuration for retries
   */
  async dispatch(url: string, payload: any, retryConfig: RetryConfig = { maxRetries: 5, initialBackoff: 1000 }): Promise<void> {
    let attempt = 0;
    
    while (attempt <= retryConfig.maxRetries) {
      try {
        this.logger.log(`Dispatching webhook to ${url} (Attempt ${attempt + 1})`);
        await axios.post(url, payload, { timeout: 5000 });
        this.logger.log(`Webhook dispatched successfully to ${url}`);
        return;
      } catch (error) {
        attempt++;
        if (attempt > retryConfig.maxRetries) {
          this.logger.error(`Webhook dispatch failed after ${retryConfig.maxRetries} retries to ${url}`, error.stack);
          throw new Error('Webhook dispatch failed');
        }

        // Exponential backoff with jitter
        const backoff = retryConfig.initialBackoff * Math.pow(2, attempt - 1);
        const jitter = Math.random() * 500;
        const waitTime = backoff + jitter;
        
        this.logger.warn(`Dispatch failed. Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
}
