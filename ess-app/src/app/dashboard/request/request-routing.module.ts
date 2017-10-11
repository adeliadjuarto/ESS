import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PATH } from '../../core/constant/index';
import { AuthenticatedGuard } from '../../core/network/authentication/shared/authenticated.guard';
import { AuthorizedGuard } from '../../core/network/authentication/shared/authorized.guard';
import { Permissions } from '../../core/network/authentication/shared/permission.enum';
import { RequestComponent } from './request.component';
import { ReimbursementRequestComponent } from './reimbursement-request/reimbursement-request.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { OvertimeRequestComponent } from './overtime-request/overtime-request.component';

const routes: Routes = [
  {
    path: PATH.EMPTY,
    children: [
      {
        path: PATH.EMPTY,
        component: RequestComponent,
      },
      {
        path: PATH.LEAVE,
        component: LeaveRequestComponent,
        data: {
          title: 'Leave',
        }
      },
      {
        path: PATH.REIMBURSEMENT,
        component: ReimbursementRequestComponent,
        data: {
          title: 'Reimbursement'
        }
      },
      {
        path: PATH.OVERTIME,
        component: OvertimeRequestComponent,
        data: {
          title: 'Overtime'
        }
      }
    ]
  },
];

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
