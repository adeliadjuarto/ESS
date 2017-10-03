
export abstract class NotificationAction {

  public static readonly Dismiss: NotificationAction = { title: 'dismiss', action: () => {} };

  title: string;
  action?: (index: number, title: string) => void;

}
