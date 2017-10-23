import { Component, OnInit } from '@angular/core';

import { values, mapKeys } from 'lodash';
import { Store } from '@ngrx/store';

import { REIMBURSEMENT_TYPES } from './../../../core/constant';
import { DashboardAction } from './../../shared/dashboard.action';
import { ReimbursementRequestService } from './shared/reimbursement-request.service';
import { Reimbursement } from './../shared/request.interface';

@Component({
  selector: 'app-reimbursement-request',
  templateUrl: './reimbursement-request.component.html',
  styleUrls: ['./reimbursement-request.component.scss']
})
export class ReimbursementRequestComponent implements OnInit {

  types = values(REIMBURSEMENT_TYPES);

  selectedType: string;
  title: string;
  description: string;
  eventDate: Date;
  amount: number;
  requestTypeId: number;
  userId: number;
  requestAttachments: File[];

  constructor(private store: Store<any>,
              private requestService: ReimbursementRequestService) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Reimbursement'
    })
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.requestAttachments = event.target.files[0];
  }

  submitRequest() {
    let eventDate = this.eventDate.getTime();

    let formRequest: Reimbursement = {
        title: this.title,
        description: this.description,
        eventDate: eventDate,
        amount: this.amount,
        requestTypeId: 1,
        userId: '1',
        'attachments[]': this.requestAttachments
      };

      let request = new FormData();

      mapKeys(formRequest, (value, key) => request.append(key, value));

      this.requestService.create(request);

  }

}
