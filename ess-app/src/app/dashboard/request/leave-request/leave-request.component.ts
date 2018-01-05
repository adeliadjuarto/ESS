import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { values, mapKeys } from 'lodash';

import { AppState } from './../../../app.reducer';
import { RequestClass } from './../shared/request-class';
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
export class LeaveRequestComponent extends RequestClass implements OnInit {

  selectedLeaveType: any;
  leaveTypes = LEAVE_TYPES;
  singleDatepickerToggle: boolean = false;
  request = {
    title: '',
    description: '',
    from: null,
    to: null,
    attachments: null
  }

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
  fileName: string = '';

  constructor(private store: Store<any>,
              private requestService: LeaveRequestService,
              private notification: NotificationService) {
    super();
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

  toggleLeaveType() {
    this.selectedLeaveType.id === 7 ? this.singleDatepickerToggle = true : this.singleDatepickerToggle = false;
    this.sliderValue = [0, 0];
  }

  fileChange(event) {
    this.request.attachments = event.target.files[0];
    this.fileName = this.request.attachments.name;
  }

  requestValid() {
    if (!this.request.title || !this.request.description || !this.selectedLeaveType || !this.request.from) {
      this.errorMessage = 'Semua input harus diisi';
      return false;
    }
    if (!this.singleDatepickerToggle && !this.request.to) {
      return false;
    }
    return true;
  }

  confirmRequest() {
    if (this.requestValid()) {
      this.requestConfirm = !this.requestConfirm;
    } else {
      this.notification.show(this.errorMessage, NotificationType.Error);
    }
  }

  submitRequest() {
      let start = this.request.from.getTime() + (this.sliderValue[0] * 1000);
      let end;
      if (this.singleDatepickerToggle) {
        end = this.request.from.getTime() + (this.sliderValue[1] * 1000);
      } else {
        end = this.request.to.getTime() + (this.sliderValue[1] * 1000);
      }

      if ( start >= end ) {
        return;
      }

      let formRequest: Leave = {
        title: this.request.title,
        description: this.request.description,
        start: start,
        end: end,
        requestTypeId: this.selectedLeaveType.id,
        'attachments[]': this.request.attachments
      };

      this.requestService.createRequest(formRequest);
      this.resetForm();
      this.getPendingMessages();
  }

  resetForm() {
    this.requestConfirm = false;
    this.request = {
    title: '',
    description: '',
    from: null,
    to: null,
    attachments: null
    }
    this.selectedLeaveType = null;
    this.sliderValue = [0, 0];
  }

  getPendingMessages() {
    idbKeyval.get(key)
         .then((pendingReqs: any[]) => {
           if (pendingReqs) {
            this.pendingRequests = pendingReqs.filter(data => data.url.includes(ENDPOINT.REQUEST.LEAVE)).length;
           }
         });
  }


}
