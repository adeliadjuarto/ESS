/**
 * Created by glenn on 7/31/17.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { PATH } from '../../../constant/index';
import { LoginService } from '../../../../login/shared/login.service';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(protected router: Router,
              protected service: LoginService) { }

  public canActivate(): Promise<boolean> {
    return new Promise((resolve: (value: boolean) => void) => {
      let result: boolean = !this.service.isLoggedIn;
      resolve(result);
      if (!result) { this.router.navigateByUrl(`${PATH.ROOT}${PATH.DASHBOARD}`); }
    });
  }

  public canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }

}
