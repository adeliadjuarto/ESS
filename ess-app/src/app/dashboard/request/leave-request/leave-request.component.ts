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

  dateFor: Date;
  dateTo: Date;

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

  submitRequest() {
    let start = this.dateFor.getTime() + (this.sliderValue[0] * 1000);
    let end;
    if (this.dateTo) {
      end = this.dateTo.getTime() + (this.sliderValue[1] * 1000);
    } else {
      end = this.dateFor.getTime() + (this.sliderValue[1] * 1000);
    }

    let request: IRequest = {
      title: '',
      description: '',
      start: start,
      end: end,
      requestTypeId: 2,
      userId: 'user-id',
      attachments: []
    };

    let formRequest = new FormData();

    mapKeys(request, (value, key) => formRequest.append(key, value));

    // this.requestService.create(formRequest);


  }

}
