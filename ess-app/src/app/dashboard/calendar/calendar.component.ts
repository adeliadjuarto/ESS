import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Store } from '@ngrx/store';

import { CustomDateFormatter } from './shared/custom-date-formatter';
import { TestData } from './shared/test-data';
import { DashboardAction } from './../shared/dashboard.action';
import { PATH } from './../../core/constant/index';
import { CalendarService } from './shared/calendar.service';

const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
  'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {

  view: string = 'month';

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  events: CalendarEvent[];
  monthNumber: number = new Date().getMonth();

  constructor(private store: Store<any>,
              private service: CalendarService,
              private router: Router,
              private route: ActivatedRoute ) {
    this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Kalender'});
    this.service.fetchEvents()
                .subscribe(event => this.events = event.map(data => {
                              return {
                                start: new Date(data.start),
                                end: new Date(data.end),
                                color: this.colors.yellow,
                                title: data.title
                                //       + ' ('
                                //       + this.getTime(data.start)
                                //       + ' - '
                                //       + this.getTime(data.end)
                                //       + ')',
                              }
                            }));
  }

  ngOnInit() {
  }

  changeMonth(increment: number) {
    if (increment === 0 ) {
       this.monthNumber = new Date().getMonth();
    } else {
      this.monthNumber = this.monthNumber + increment;
    }
  }

  public get month(): string {
    return monthNames[this.monthNumber - 1];
  }

  getTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();

    return hours + ':' + minutes;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  redirectToAddForm() {
    this.router.navigate([PATH.ADD], { relativeTo: this.route });
  }



}
