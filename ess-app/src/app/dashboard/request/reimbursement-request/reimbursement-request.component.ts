import { Component, OnInit } from '@angular/core';

import { values, mapKeys } from 'lodash';
import { Store } from '@ngrx/store';

import { AppState } from './../../../app.reducer';
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
  userId: string;
  requestAttachments: File[];

  constructor(private store: Store<any>,
              private requestService: ReimbursementRequestService) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Reimbursement'
    });
    this.store.select((state: AppState) => state.userState).subscribe((state) => {
      this.userId = state.id;
    });
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
        'attachments[]': this.requestAttachments
    };

    this.requestService.createRequest(formRequest);

  }

}
