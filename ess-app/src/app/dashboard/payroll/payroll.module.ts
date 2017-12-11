import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollComponent } from './payroll.component';
import { PayrollService } from './shared/payroll.service';
import { UIModule } from './../../shared/user-interface.module';

@NgModule({
  imports: [
    CommonModule,
    UIModule
  ],
  declarations: [
    PayrollComponent
  ],
  providers: [
    PayrollService
  ]
})
export class PayrollModule { }
