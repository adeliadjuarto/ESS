import { NotificationAction } from './notification-action.interface';

export interface Notification {

  message: string;
  type?: string;
  icon?: string;
  actions?: Array<NotificationAction>;

}
