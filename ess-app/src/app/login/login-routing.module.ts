import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';

import { PATH } from './../core/constant/path.constant';

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: LoginComponent,
  }
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
