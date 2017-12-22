import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PayrollComponent } from './payroll.component';
import { PayrollService } from './shared/payroll.service';
import { UIModule } from './../../shared/user-interface.module';
import { PayrollViewerComponent } from './payroll-viewer/payroll-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    UIModule,
    FormsModule
  ],
  declarations: [
    PayrollComponent,
    PayrollViewerComponent
  ],
  providers: [
    PayrollService
  ]
})
export class PayrollModule { }
