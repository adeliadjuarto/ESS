import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollComponent } from './payroll.component';
import { UIModule } from './../../shared/user-interface.module';

@NgModule({
  imports: [
    CommonModule,
    UIModule
  ],
  declarations: [
    PayrollComponent
  ]
})
export class PayrollModule { }
