import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChatComponent } from './chat/chat.component';
import { RequestModule } from './request/request.module';
import { StatusComponent } from './status/status.component';
import { PayrollComponent } from './payroll/payroll.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    RequestModule
  ],
  declarations: [
    DashboardComponent,
    MenuComponent,
    ChatComponent,
    StatusComponent,
    PayrollComponent,
  ]
})
export class DashboardModule { }
