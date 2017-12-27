import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalsComponent } from './approvals.component';
import { ApprovalsService } from './shared/approvals.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ApprovalsComponent
  ],
  providers: [
    ApprovalsService
  ]
})
export class ApprovalsModule { }
