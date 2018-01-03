import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { values, mapKeys } from 'lodash';

import { AppState } from './../../../app.reducer';
import { TimeFormatter } from './../shared/time-formatter';
import { FormRequest, Leave } from './../shared/request.interface';
import { LEAVE_TYPES, ENDPOINT } from './../../../core/constant';
import { DashboardAction } from './../../shared/dashboard.action';
import { LeaveRequestService } from './shared/leave-request.service';
import { NotificationService } from './../../../shared/notification/notification.service';
import { NotificationType } from './../../../shared/notification/notification.enum';

declare var idbKeyval;
const key = 'pwa-sync';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {

  selectedLeaveType: any;
  leaveTypes = LEAVE_TYPES;
  singleDatepicker: boolean = false;

  requestTitle: string;
  requestDescription: string;
  dateFor: Date;
  dateTo: Date;
  requestAttachments: File;
  userId: string;
  errorMessage: string;
  requestConfirm: boolean = false;

  sliderValue: any = [0, 0];
  sliderConfig = {
    start: [0, 64800],
    connect: true,
    range: {
      min: 8 * 60 * 60,
      max: 18 * 60 * 60
    },
    tooltips: [ new TimeFormatter(), new TimeFormatter() ],
    step: 30 * 60
  }

  pendingRequests: number = 0;
  pendingMessage: boolean = false;
  fileName: string = '';

  constructor(private store: Store<any>,
              private requestService: LeaveRequestService,
              private notification: NotificationService) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Pengajuan Cuti'
    });

    this.store.select((state: AppState) => state.userState).subscribe((state) => {
      if (state) {
        this.userId = state.user.id;
      }
    });
    this.getPendingMessages();
  }

  ngOnInit() {
  }

  doStuff() {
    this.selectedLeaveType === 7 ? this.singleDatepicker = true : this.singleDatepicker = false;
    this.sliderValue = [0, 0];
  }

  fileChange(event) {
    this.requestAttachments = event.target.files[0];
    this.fileName = this.requestAttachments.name;
  }

  allFilesExist() {
    if (!this.requestTitle || !this.requestDescription || !this.selectedLeaveType || !this.dateFor) {
      this.errorMessage = 'Semua input harus diisi';
      return false;
    }
    if (!this.singleDatepicker && !this.dateTo) {
      return false;
    }
    return true;
  }

  confirmRequest() {
    if (this.allFilesExist()) {
      this.requestConfirm = !this.requestConfirm;
    } else {
      this.notification.show(this.errorMessage, NotificationType.Error);
    }
  }

  submitRequest() {
      let start = this.dateFor.getTime() + (this.sliderValue[0] * 1000);
      let end;
      if (this.singleDatepicker) {
        end = this.dateFor.getTime() + (this.sliderValue[1] * 1000);
      } else {
        end = this.dateTo.getTime() + (this.sliderValue[1] * 1000);
      }

      if ( start >= end ) {
        return;
      }

      let formRequest: Leave = {
        title: this.requestTitle,
        description: this.requestDescription,
        start: start,
        end: end,
        requestTypeId: this.selectedLeaveType.id,
        'attachments[]': this.requestAttachments
      };

      this.requestService.createRequest(formRequest);
      this.resetForm();
      this.getPendingMessages();
  }

  dateDisplay(date: Date) {
    let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', dateOptions);
  }

  resetForm() {
    this.requestConfirm = false;
    this.dateFor = null;
    this.dateTo = null;
    this.requestAttachments = null;
    this.requestTitle = '';
    this.requestDescription = '';
    this.selectedLeaveType = null;
    this.sliderValue = [0, 0];
  }

  getPendingMessages() {
    idbKeyval.get(key)
         .then((pendingReqs: any[]) => {
           if (pendingReqs) {
            this.pendingRequests = pendingReqs.filter(data => data.url.includes(ENDPOINT.REQUEST.LEAVE)).length;
           }
         })
         .then(() => this.pendingMessage = this.pendingRequests > 0 ? true : false);
  }


}
