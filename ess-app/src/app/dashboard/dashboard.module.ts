import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChatModule } from './chat/chat.module';
import { RequestModule } from './request/request.module';
import { StatusComponent } from './status/status.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ChatModule,
    RequestModule
  ],
  declarations: [
    DashboardComponent,
    MenuComponent,
    StatusComponent,
  ]
})
export class DashboardModule { }
