import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { RequestService } from './../shared/request.service';
import { DashboardAction } from './../../shared/dashboard.action';
import { FormRequest } from './../shared/request.interface';

@Component({
  selector: 'app-overtime-request',
  templateUrl: './overtime-request.component.html',
  styleUrls: ['./overtime-request.component.scss']
})
export class OvertimeRequestComponent implements OnInit {

  overtimeHours: number = 0;
  requestTitle: string;
  requestDescription: string;
  requestDate: Date;

  constructor(private store: Store<any>,
              private requestService: RequestService) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Overtime'
    })
  }

  ngOnInit() {
  }

  onSliderChange(event) {
    this.overtimeHours = event.value;
  }

  submitRequest() {

    if (this.requestValid()) {
      console.log('yay');
    } else {
      console.log('nay');
    }

  }

  requestValid() {
    if (!this.requestTitle || !this.requestDescription || this.overtimeHours === 0) {
      return false;
    }

    console.log(this.overtimeHours);
    
    if (this.requestDate.getTime() < Date.now()) {
      return false;
    }

    return true;

  }


}
