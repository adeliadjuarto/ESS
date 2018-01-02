import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { PATH } from './../../core/constant/index';
import { Payroll } from './shared/payroll.model';
import { AppState } from './../../app.reducer';
import { DashboardAction } from './../shared/dashboard.action';
import { PayrollService } from './shared/payroll.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {

  processedPayrolls: Payroll[];
  selectedPayroll: Payroll;

  constructor(private store: Store<any>,
              private service: PayrollService) {
    this.service.fetchPayroll();
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Slip Gaji'
    });
    this.store.select((state: AppState) => state.payrollState).subscribe(payrollState => {
      if (payrollState) {
        this.processedPayrolls = payrollState.processedPayrolls;
        this.selectedPayroll = this.processedPayrolls[0];
      }
    })
  }

  ngOnInit() {
  }

}
