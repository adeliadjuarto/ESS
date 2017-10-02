import { Component, OnInit } from '@angular/core';

import { DEFAULTS } from '../../core/constant/index';
import { NotificationAction } from './notification-action.interface';
import { NotificationType } from './notification.enum';
import { Notification } from './notification.interface';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit {

  public readonly timeout: number = DEFAULTS.TOAST_TIMEOUT;

  public notifications: Array<Notification> = Array<Notification>();
  public allowMultipleNotification: boolean = false;

  constructor() { }

  ngOnInit() { }

  public clear() {
    this.notifications = Array<Notification>();
  }

  public append(notification: Notification) {
    let x: Notification = Object.assign({
      type: NotificationType.Default,
      actions: Array<NotificationAction>(),
    }, notification);

    if (!this.allowMultipleNotification) { this.clear(); }
    this.notifications.push(x);
  }

  public removeAt(index: number) {
    this.notifications.splice(index, 1);
  }

}
