import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { mapKeys } from 'lodash';

import { AppState } from './../../../app.reducer';
import { Overtime } from './../shared/request.interface';
import { OvertimeRequestService } from './shared/overtime-request.service';
import { DashboardAction } from './../../shared/dashboard.action';
import { FormRequest } from './../shared/request.interface';
import { TimeFormatter } from './../shared/time-formatter';
import { NotificationService } from './../../../shared/notification/notification.service';
import { NotificationType } from './../../../shared/notification/notification.enum';

@Component({
  selector: 'app-overtime-request',
  templateUrl: './overtime-request.component.html',
  styleUrls: ['./overtime-request.component.scss']
})
export class OvertimeRequestComponent implements OnInit {

  requestTitle: string;
  requestDescription: string;
  requestDate: Date;
  requestAttachment: File[];
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

  start: string;
  end: string;

  constructor(private store: Store<any>,
              private requestService: OvertimeRequestService,
              private notification: NotificationService) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Overtime'
    });

    this.store.select((state: AppState) => state.userState).subscribe((state) => {
      this.userId = state.id;
    });
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.requestAttachment = event.target.files[0];
  }

  confirmRequest() {
    if (this.requestValid()) {
      let eventDate = this.requestDate.getTime();
      let startTime = eventDate + (this.sliderValue[0] * 1000);
      let endTime = eventDate + (this.sliderValue[1] * 1000);

      let dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

      this.start = new Date(startTime).toLocaleDateString('id-ID', dateOptions);
      this.end = new Date(endTime).toLocaleDateString('id-ID', dateOptions);

      this.requestConfirm = !this.requestConfirm;
    } else {
      this.notification.show(this.errorMessage, NotificationType.Error);
    }
  }

  submitRequest() {
    let eventDate = this.requestDate.getTime();
    let startTime = eventDate + (this.sliderValue[0] * 1000);
    let endTime = eventDate + (this.sliderValue[1] * 1000);
    let formRequest: Overtime = {
      title: this.requestTitle,
      description: this.requestDescription,
      eventDate: eventDate,
      startTime: startTime,
      endTime: endTime,
      'attachments[]': this.requestAttachment
    };
    this.requestService.createRequest(formRequest);
    this.resetForm();
  }


  requestValid() {
    if (!this.requestTitle || !this.requestDescription) {
      this.errorMessage = 'Semua input harus diisi';
      return false;
    }

    if (this.requestDate.getTime() > Date.now()) {
      this.errorMessage = 'Tanggal melebihi tanggal hari ini'
      return false;
    }

    if (!this.requestAttachment) {
      this.errorMessage = 'File bukti belum diupload';
      return false;
    }

    return true;
  }

  resetForm() {
    this.requestConfirm = false;
    this.requestDate = null;
    this.requestAttachment = [];
    this.requestTitle = '';
    this.requestDescription = '';
    this.sliderValue = [0, 0];
  }

}
