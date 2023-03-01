import { AggregateRoot } from '@nestjs/cqrs';
import { NotificationEvent } from '../events/notification.event';

export class Notification extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  sendOtp(email: string) {
    this.apply(new NotificationEvent(email));
  }
}
