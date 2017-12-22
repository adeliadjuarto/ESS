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

  public currentDate: string;
  public currentPayrollStatus: string = '';
  public latestProcessedPayroll: string = '';

  private dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private service: PayrollService) {
    this.service.fetchPayroll();
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Payroll'
    });
    this.store.select((state: AppState) => state.payrollState).subscribe(payrollState => {
      if (payrollState) {
        if (payrollState.currentPayroll) {
          this.currentPayrollStatus = payrollState.currentPayroll.payrollStatus;
        }
        if (payrollState.processedPayrolls.length > 0) {
          this.latestProcessedPayroll = payrollState.processedPayrolls[0].monthName;
        }
      }
    })
    this.currentDate = new Date().toLocaleDateString('en-GB', this.dateOptions);
  }

  ngOnInit() {
  }

  redirectToPayrollSlip() {
    this.router.navigate([PATH.PAYROLL_SLIP], { relativeTo: this.route });
  }

}
