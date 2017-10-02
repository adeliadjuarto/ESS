import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { PATH } from '../../../constant/index';
import { LoginService } from '../../../../login/shared/login.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(protected router: Router,
              protected service: LoginService) { }

  public canActivate(): Promise<boolean> {
    return new Promise((resolve: (value: boolean) => void) => {
      let result: boolean = this.service.isLoggedIn;
      resolve(result);
      if (!result) { this.router.navigateByUrl(`${PATH.ROOT}${PATH.LOGIN}`); }
    });
  }

  public canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }

}
