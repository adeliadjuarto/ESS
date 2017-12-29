import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { mapKeys } from 'lodash';

import { AppState } from './../../../app.reducer';
import { CalendarService } from './../shared/calendar.service';
import { DashboardAction } from './../../shared/dashboard.action';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  eventForm = { description: null, start: null, end: null };
  userId = null;

  constructor(private service: CalendarService,
              private store: Store<any>) {
      this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Tambah Event'});
      this.store.select((state: AppState) => state.userState).subscribe(
        userState => {
          this.userId = userState.user.id;
        }
      )
  }

  ngOnInit() {
  }

  submitRequest() {
    if (this.eventForm.description && this.eventForm.end && this.eventForm.start && this.userId) {
      let request = {
        summary: this.eventForm.description,
        'userIds[]': [this.userId],
        start: this.eventForm.start.getTime(),
        end: this.eventForm.end.getTime(),
        isAllDayEvent: true
      }

      let requestForm = new FormData();

      mapKeys(request, (value, mapKey) => {requestForm.append(mapKey, value)});
      this.service.create(requestForm);
    }
  }

}
