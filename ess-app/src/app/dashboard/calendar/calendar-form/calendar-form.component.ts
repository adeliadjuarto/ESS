import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { mapKeys } from 'lodash';

import { AppState } from './../../../app.reducer';
import { CalendarService } from './../shared/calendar.service';
import { DashboardAction } from './../../shared/dashboard.action';
import { NotificationService } from './../../../shared/notification/notification.service';
import { NotificationType } from './../../../shared/notification/notification.enum';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  eventForm = { description: null, start: null, end: null };
  userId = null;
  requestConfirm: boolean= false;

  constructor(private service: CalendarService,
              private store: Store<any>,
              private notification: NotificationService) {
      this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Tambah Event'});
      this.store.select((state: AppState) => state.userState).subscribe(
        userState => {
          this.userId = userState.user.id;
        }
      )
  }

  ngOnInit() {
  }

  confirmRequest() {
    if (this.eventForm.description && this.eventForm.end && this.eventForm.end && this.userId) {
      this.requestConfirm = !this.requestConfirm;
    } else {
      this.notification.show('Semua field harus diisi', NotificationType.Error);
    }
  }

  submitRequest() {
    let request = {
      summary: this.eventForm.description,
      'userIds[]': [this.userId],
      start: this.eventForm.start.getTime(),
      end: this.eventForm.end.getTime(),
      isAllDayEvent: true
    }
    let requestForm = new FormData();
    mapKeys(request, (value, mapKey) => {requestForm.append(mapKey, value)});
    this.service.create(requestForm).subscribe(response => this.notification.show(response));
    this.resetForm();
  }

  dateDisplay(date: Date) {
    let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', dateOptions);
  }

  resetForm() {
    this.requestConfirm = false;
    this.eventForm = { description: null, start: null, end: null };
  }

}
