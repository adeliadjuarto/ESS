import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

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
  public latestPayroll: Payroll;
  public currentPayroll: Payroll;

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
        this.latestPayroll = payrollState.latestPayroll;
        this.currentPayroll = payrollState.currentPayroll;
      }
    })
    this.currentDate = new Date().toLocaleDateString('en-GB', this.dateOptions);
  }

  ngOnInit() {
  }

  redirectToPayrollSlip() {
    console.log(this.route);
    this.router.navigate([this.latestPayroll.id], { relativeTo: this.route });
  }

}
