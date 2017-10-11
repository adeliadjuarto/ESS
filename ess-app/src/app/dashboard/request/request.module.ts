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
    RequestService
  ]
})
export class RequestModule { }
