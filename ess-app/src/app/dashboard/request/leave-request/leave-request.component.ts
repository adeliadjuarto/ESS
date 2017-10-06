import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { values } from 'lodash';

import { LEAVE_TYPES } from './../../../core/constant';
import { DashboardAction } from './../../shared/dashboard.action';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {

  leaveTypes = values(LEAVE_TYPES);
  singleDatepicker: boolean = false;
  sliderValue: number = 0;

  selectedLeaveType;

  constructor(private store: Store<any>) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Leave'
    })
  }

  ngOnInit() {
  }

  doStuff() {
    if (this.selectedLeaveType === LEAVE_TYPES.PARTIAL_DAY_LEAVE) {
      this.singleDatepicker = true;
    } else {
      this.singleDatepicker = false;
    }
  }

  doWeirdStuff(event: any) {
    this.sliderValue = event.value;
    console.log(this.sliderValue);
  }

}
