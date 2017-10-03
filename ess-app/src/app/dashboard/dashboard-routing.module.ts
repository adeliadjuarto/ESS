import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PATH } from '../core/constant/index';
import { AuthenticatedGuard } from '../core/network/authentication/shared/authenticated.guard';
import { AuthorizedGuard } from '../core/network/authentication/shared/authorized.guard';
import { Permissions } from '../core/network/authentication/shared/permission.enum';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: DashboardComponent,
    data: {
      permission: Permissions.ReadAccount
    },
    children: [
      {
        path: PATH.EMPTY,
        component: MenuComponent,
        data: {
          permission: Permissions.ReadAccount
        },
      },
    ]
  },
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
