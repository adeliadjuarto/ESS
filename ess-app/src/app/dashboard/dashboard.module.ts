import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChatComponent } from './chat/chat.component';
import { RequestComponent } from './request/request.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    MenuComponent,
    ChatComponent,
    RequestComponent
  ]
})
export class DashboardModule { }
