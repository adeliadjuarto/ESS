import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule as AngularCalendar } from 'angular-calendar';

import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule,
    AngularCalendar.forRoot()
  ],
  declarations: [
    CalendarComponent,
  ]
})
export class CalendarModule { }
