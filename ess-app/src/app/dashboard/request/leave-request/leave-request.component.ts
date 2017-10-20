import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { values, mapKeys } from 'lodash';

import { TimeFormatter } from './../shared/time-formatter';
import { FormRequest, IRequest } from './../shared/request.interface';
import { LEAVE_TYPES } from './../../../core/constant';
import { DashboardAction } from './../../shared/dashboard.action';
import { RequestService } from './../shared/request.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {

  selectedLeaveType: string;
  leaveTypes = values(LEAVE_TYPES);
  singleDatepicker: boolean = false;

  requestTitle: string;
  requestDescription: string;
  dateFor: Date;
  dateTo: Date;
  requestAttachments: File[];

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

  constructor(private store: Store<any>,
              private requestService: RequestService) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Leave'
    })
  }

  ngOnInit() {
  }

  doStuff() {
    this.selectedLeaveType === LEAVE_TYPES.PARTIAL_DAY_LEAVE ? this.singleDatepicker = true : this.singleDatepicker = false;
    this.sliderValue = [0, 0];
  }

  fileChange(event) {
    this.requestAttachments = event.target.files[0];
  }

  allFilesExist() {
    if (!this.requestTitle || !this.requestDescription || !this.selectedLeaveType || !this.dateFor) {
      return false;
    }
    if (!this.singleDatepicker && !this.dateTo) {
      return false;
    }
    if (!this.requestAttachments) {
      return false;
    }

    return true;
  }

  submitRequest() {
    if (this.allFilesExist()) {
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

      let request: IRequest = {
        title: this.requestTitle,
        description: this.requestDescription,
        start: start,
        end: end,
        requestTypeId: 1,
        userId: '1',
        'attachments[]': this.requestAttachments
      };

      let formRequest = new FormData();

      mapKeys(request, (value, key) => formRequest.append(key, value));

      this.requestService.create(formRequest);

    } else {
      console.log('error happens');
    }
  }

}
