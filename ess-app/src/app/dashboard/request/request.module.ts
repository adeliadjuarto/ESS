import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NouisliderModule } from 'ng2-nouislider';

import { UIModule } from './../../shared/user-interface.module';
import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';
import { RequestService } from './shared/request.service';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { ReimbursementRequestComponent } from './reimbursement-request/reimbursement-request.component';
import { OvertimeRequestComponent } from './overtime-request/overtime-request.component';
import { LeaveRequestService } from './leave-request/shared/leave-request.service';
import { ReimbursementRequestService } from './reimbursement-request/shared/reimbursement-request.service';
import { OvertimeRequestService } from './overtime-request/shared/overtime-request.service';

@NgModule({
  imports: [
    CommonModule,
    UIModule,
    RequestRoutingModule,
    FormsModule,
    NouisliderModule
  ],
  declarations: [
    RequestComponent,
    LeaveRequestComponent,
    ReimbursementRequestComponent,
    OvertimeRequestComponent
  ],
  providers: [
    RequestService,
    LeaveRequestService,
    ReimbursementRequestService,
    OvertimeRequestService
  ]
})
export class RequestModule { }
