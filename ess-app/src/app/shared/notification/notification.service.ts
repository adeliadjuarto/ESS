import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';

import { InjectionService } from '../../core/utilities/injection.service';
import { NotificationContainerComponent } from './notification-container.component';
import { NotificationIcon, NotificationType } from './notification.enum';
import { Notification } from './notification.interface';

@Injectable()
export class NotificationService {

  protected static containerRef: ComponentRef<NotificationContainerComponent>;

  protected get overlay(): ComponentRef<NotificationContainerComponent> {
    return this.constructor.prototype.containerRef;
  }

  constructor(private injector: Injector,
              private injection: InjectionService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    if (!this.overlay) {
      let factory: ComponentFactory<NotificationContainerComponent> = this.componentFactoryResolver.resolveComponentFactory(NotificationContainerComponent);
      this.constructor.prototype.containerRef = factory.create(this.injector);
    }

    this.injection.attach(this.overlay);
  }

  public present(notification: Notification) {
    this.overlay.instance.append(Object.assign({
      type: NotificationType.Default,
      icon: NotificationIcon.None
    }, notification));
  }

  public show(message: string, type: string = NotificationType.Default) {
    this.present({ message, type });
  }

  public clear() {
    this.overlay.instance.clear();
  }

}
