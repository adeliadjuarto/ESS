import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './../../shared/user-interface.module';
import { ApprovalsComponent } from './approvals.component';
import { ApprovalsCardComponent } from './approvals-card/approvals-card.component';
import { ApprovalsService } from './shared/approvals.service';

@NgModule({
  imports: [
    CommonModule,
    UIModule
  ],
  declarations: [
    ApprovalsComponent,
    ApprovalsCardComponent
  ],
  providers: [
    ApprovalsService
  ]
})
export class ApprovalsModule { }
