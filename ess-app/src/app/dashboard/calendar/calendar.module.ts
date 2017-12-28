import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule as AngularCalendar } from 'angular-calendar';

import { UIModule } from './../../shared/user-interface.module';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './shared/calendar.service';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    AngularCalendar.forRoot()
  ],
  declarations: [
    CalendarComponent,
    CalendarFormComponent,
  ],
  providers: [
    CalendarService
  ]
})
export class CalendarModule { }
