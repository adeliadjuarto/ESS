import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../shared/material/material.module';
import { RequestComponent } from './request.component';
import { RequestService } from './shared/request.service';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { ReimbursementRequestComponent } from './reimbursement-request/reimbursement-request.component';
import { OvertimeRequestComponent } from './overtime-request/overtime-request.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    RequestComponent,
    LeaveRequestComponent,
    ReimbursementRequestComponent,
    OvertimeRequestComponent
  ],
  providers: [
    RequestService
  ]
})
export class RequestModule { }
