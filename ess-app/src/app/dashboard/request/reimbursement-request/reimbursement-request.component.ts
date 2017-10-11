import { Component, OnInit } from '@angular/core';

import { values } from 'lodash';
import { Store } from '@ngrx/store';

import { REIMBURSEMENT_TYPES } from './../../../core/constant';
import { DashboardAction } from './../../shared/dashboard.action';

@Component({
  selector: 'app-reimbursement-request',
  templateUrl: './reimbursement-request.component.html',
  styleUrls: ['./reimbursement-request.component.scss']
})
export class ReimbursementRequestComponent implements OnInit {

  types = values(REIMBURSEMENT_TYPES);

  constructor(private store: Store<any>) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Reimbursement'
    })
  }

  ngOnInit() {
  }

}
