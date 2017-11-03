import { Component, OnInit } from '@angular/core';

import { CalendarDateFormatter, CalendarEvent } from 'angular-calendar';

import { CustomDateFormatter } from './shared/custom-date-formatter';
import { TestData } from './shared/test-data';

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
  events: CalendarEvent[] = TestData.map(data => {
                              return {
                                start: new Date(data.start.dateTime.value),
                                end: new Date(data.end.dateTime.value),
                                color: this.colors.yellow,
                                title: data.summary + ' ('
                                      + this.getTime(data.start.dateTime.value)
                                      + ' - '
                                      + this.getTime(data.end.dateTime.value)
                                      + ')',
                              }
                            })

  constructor() { }

  ngOnInit() {
  }

  getTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();

    return hours + ':' + minutes;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (this.viewDate) {
      if (
        (this.viewDate && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }


}
