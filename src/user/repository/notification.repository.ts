import { Injectable } from '@nestjs/common';
import { Notification } from '../models/notification.model';

@Injectable()
export class NotificationRepository {
  async findOneById(): Promise<Notification> {
    return;
  }
}
