import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { mapKeys } from 'lodash';

import { Request } from './../shared/request';
import { AppState } from './../../../app.reducer';
import { ENDPOINT } from './../../../core/constant';
import { Overtime } from './../shared/request.interface';
import { OvertimeRequestService } from './shared/overtime-request.service';
import { DashboardAction } from './../../shared/dashboard.action';
import { FormRequest } from './../shared/request.interface';
import { TimeFormatter } from './../shared/time-formatter';
import { NotificationService } from './../../../shared/notification/notification.service';
import { NotificationType } from './../../../shared/notification/notification.enum';

declare var idbKeyval;
const key = 'pwa-sync';

@Component({
  selector: 'app-overtime-request',
  templateUrl: './overtime-request.component.html',
  styleUrls: ['./overtime-request.component.scss']
})
export class OvertimeRequestComponent extends Request implements OnInit {

  request = {
    title: '',
    description: '',
    date: new Date(),
    attachments: null,
    from: '',
    to: ''
  }

  userId: string;
  errorMessage: string;
  requestConfirm: boolean = false;

  sliderValue: any = [0, 0];
  sliderConfig = {
    start: [0, 64800],
    connect: true,
    range: {
      min: 18 * 60 * 60,
      max: 24 * 60 * 60
    },
    tooltips: [ new TimeFormatter(), new TimeFormatter() ],
    step: 30 * 60
  };

  pendingRequests: number = 0;
  fileName: string = '';

  constructor(private store: Store<any>,
              private requestService: OvertimeRequestService,
              private notification: NotificationService) {
    super();
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Pengajuan Lembur'
    });

    this.store.select((state: AppState) => state.userState).subscribe((state) => {
      this.userId = state.user.id;
    });
    this.getPendingMessages();
  }

  ngOnInit() {
  }

  fileChange(event: any) {
    this.request.attachments = event.target.files[0];
    this.fileName = this.request.attachments.name;
  }

  confirmRequest() {
    if (this.requestValid()) {
      let eventDate = this.request.date.getTime();
      let startTime = eventDate + (this.sliderValue[0] * 1000);
      let endTime = eventDate + (this.sliderValue[1] * 1000);

      let dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

      this.request.from = new Date(startTime).toLocaleDateString('id-ID', dateOptions);
      this.request.to = new Date(endTime).toLocaleDateString('id-ID', dateOptions);

      this.requestConfirm = !this.requestConfirm;
    } else {
      this.notification.show(this.errorMessage, NotificationType.Error);
    }
  }

  submitRequest() {
    let eventDate = this.request.date.getTime();
    let startTime = eventDate + (this.sliderValue[0] * 1000);
    let endTime = eventDate + (this.sliderValue[1] * 1000);
    let formRequest: Overtime = {
      title: this.request.title,
      description: this.request.description,
      eventDate: eventDate,
      startTime: startTime,
      endTime: endTime,
      'attachments[]': this.request.attachments
    };
    this.requestService.createRequest(formRequest);
    this.resetForm();
    this.getPendingMessages();
  }

  requestValid() {
    if (!this.request.title || !this.request.description) {
      this.errorMessage = 'Semua input harus diisi';
      return false;
    }

    if (this.request.date.getTime() > Date.now()) {
      this.errorMessage = 'Tanggal melebihi tanggal hari ini'
      return false;
    }

    return true;
  }

  resetForm() {
    this.requestConfirm = false;
    this.request = {
      title: '',
      description: '',
      date: new Date(),
      attachments: null,
      from: '',
      to: ''
    }
    this.sliderValue = [0, 0];
  }

  getPendingMessages() {
    idbKeyval.get(key)
         .then((pendingReqs: any[]) => {
           if (pendingReqs) {
            this.pendingRequests = pendingReqs.filter(data => data.url.includes(ENDPOINT.REQUEST.OVERTIME)).length;
           }
         })
  }

}
