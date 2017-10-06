import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { TYPES } from './../../../core/constant';
import { DashboardAction } from './../../shared/dashboard.action';

@Component({
  selector: 'app-reimbursement-request',
  templateUrl: './reimbursement-request.component.html',
  styleUrls: ['./reimbursement-request.component.scss']
})
export class ReimbursementRequestComponent implements OnInit {

  types = TYPES.REIMBURSEMENT;

  constructor(private store: Store<any>) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Reimbursement'
    })
  }

  ngOnInit() {
  }

}
