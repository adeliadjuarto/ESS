/**
 * Created by glenn on 8/9/17.
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { PATH } from '../../../constant/index';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class AuthorizedGuard implements CanActivate {

  constructor(protected service: AuthorizationService,
              protected router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let hasPermissionData: boolean = !!route.data && !!route.data.permission;
    let result: boolean = hasPermissionData && this.service.isAuthorized(route.data.permission);

    if (!result) { this.router.navigateByUrl(PATH.DASHBOARD); }

    return result;
  }

}
