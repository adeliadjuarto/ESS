import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UIModule } from '../shared/user-interface.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './shared/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ],
  exports: [ RouterModule ]
})
export class LoginModule { }
