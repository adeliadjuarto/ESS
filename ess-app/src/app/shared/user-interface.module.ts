import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { NotificationModule } from './notification/notification.module';
import { CircularRangeSliderComponent } from './circular-range-slider/circular-range-slider.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NotificationModule,
    MaterialModule
  ],
  declarations: [
    CircularRangeSliderComponent
  ]
})
export class UIModule { }
