import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../shared/dashboard.action';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Payroll'
    })
  }
  ngOnInit() {
  }

}
