import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationContainerComponent } from './notification-container.component';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule
  ],
  exports: [
    MdButtonModule
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
