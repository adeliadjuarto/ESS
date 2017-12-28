import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChatModule } from './chat/chat.module';
import { RequestModule } from './request/request.module';
import { StatusModule } from './status/status.module';
import { PayrollModule } from './payroll/payroll.module';
import { CalendarModule } from './calendar/calendar.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { ContactsModule } from './contacts/contacts.module';
import { HcmInfoModule } from './hcm-info/hcm-info.module';
import { MedicalInfoModule } from './medical-info/medical-info.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ChatModule,
    RequestModule,
    CalendarModule,
    PayrollModule,
    StatusModule,
    ApprovalsModule,
    ContactsModule,
    MedicalInfoModule,
    HcmInfoModule
  ],
  declarations: [
    DashboardComponent,
    MenuComponent,
  ]
})
export class DashboardModule { }
