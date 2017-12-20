import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { mapKeys } from 'lodash';

import { AppState } from './../../../app.reducer';
import { Overtime } from './../shared/request.interface';
import { OvertimeRequestService } from './shared/overtime-request.service';
import { DashboardAction } from './../../shared/dashboard.action';
import { FormRequest } from './../shared/request.interface';
import { TimeFormatter } from './../shared/time-formatter';

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
  }

  constructor(private store: Store<any>,
              private requestService: OvertimeRequestService) {
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

  // onSliderChange(event) {
  //   this.overtimeHours = event.value;
  // }

  fileChange(event) {
    this.requestAttachment = event.target.files[0];
  }

  submitRequest() {

    if (this.requestValid()) {
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
    } else {
      console.log('nay');
    }
  }


  requestValid() {
    if (!this.requestTitle || !this.requestDescription) {
      return false;
    }

    if (this.requestDate.getTime() < Date.now()) {
      return false;
    }

    return true;

  }

}
