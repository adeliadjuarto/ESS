import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationContainerComponent } from './notification-container.component';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule
  ],
  declarations: [
    NotificationContainerComponent,
    NotificationComponent
  ],
  entryComponents: [
    NotificationContainerComponent,
    NotificationComponent
  ],
  providers: [
    NotificationService
  ]
})
export class NotificationModule { }
