import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { PayrollService } from './../shared/payroll.service';
import { Payroll } from './../shared/payroll.model';
import { AppState } from './../../../app.reducer';

@Component({
  selector: 'app-payroll-viewer',
  templateUrl: './payroll-viewer.component.html',
  styleUrls: ['./payroll-viewer.component.scss']
})
export class PayrollViewerComponent implements OnInit {

  processedPayrolls: Payroll[];
  selectedPayroll: Payroll;

  constructor(private store: Store<any>,
              private service: PayrollService) {
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
