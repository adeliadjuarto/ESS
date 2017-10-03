
export abstract class NotificationType {

  public static readonly Default: string = 'info';
  public static readonly Info: string = 'info';
  public static readonly Success: string = 'success';
  public static readonly Error: string = 'error';
  public static readonly Warning: string = 'warning';

}

export abstract class NotificationIcon {

  public static readonly None: string = null;
  public static readonly Info: string = 'info';
  public static readonly Error: string = 'error';
  public static readonly Warning: string = 'warning';

}
