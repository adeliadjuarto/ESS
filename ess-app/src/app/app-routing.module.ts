import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PATH } from './core/constant/path.constant';
import { AuthenticatedGuard } from './core/network/authentication/shared/authenticated.guard';
import { NotAuthenticatedGuard } from './core/network/authentication/shared/not-authenticated.guard';

const routes: Routes = [
  { path: PATH.EMPTY, redirectTo: PATH.DASHBOARD, pathMatch: PATH.MATCHING.FULL },
  {
    path: PATH.LOGIN,
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: PATH.DASHBOARD,
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  }
];

const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
});

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class AppRoutingModule { }