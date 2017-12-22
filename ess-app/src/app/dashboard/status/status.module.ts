import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusComponent } from './status.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { StatusService } from './shared/status.service';
import { UIModule } from './../../shared/user-interface.module';

@NgModule({
  imports: [
    CommonModule,
    UIModule
  ],
  declarations: [
    StatusComponent,
    StatusCardComponent
  ],
  providers: [
    StatusService
  ]
})
export class StatusModule { }
