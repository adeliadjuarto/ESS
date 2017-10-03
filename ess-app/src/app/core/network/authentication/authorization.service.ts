/**
 * Created by glenn on 8/9/17.
 */

import { Injectable } from '@angular/core';
import { Route, Routes } from '@angular/router';

import { Authority } from './shared/authority.model';
import { User } from '../../../dashboard/account/shared/user.model';
import { GENERAL, MenuItem } from '../../constant/index';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthorizationService {

  constructor(protected token: TokenService) { }

  public isAuthorized(permission: string): boolean {
    let result: boolean = false;

    if (this.token.exists(GENERAL.TOKEN.USER)) {
      let user: User = this.token.retrieve<User>(GENERAL.TOKEN.USER, User);
      let authorities: Array<string> = user.authorities.map((auth: Authority) => auth.authority);

      result = !!authorities.find((authority: string) => authority === permission);
    }

    return result;
  }

  public authorizedRoutes(routes: Routes): Routes {
    let result: Routes = Array<Route>();

    if (this.token.exists(GENERAL.TOKEN.USER)) {
      let user: User = this.token.retrieve<User>(GENERAL.TOKEN.USER, User);
      let authorities: Array<string> = user.authorities.map((auth: Authority) => auth.authority);

      result = (routes || Array<Route>())
        .filter((r: Route) => !!r.data && !!r.data.permission)
        .filter((r: Route) => authorities.find((auth: string) => r.data.permission === auth));
    }

    return result;
  }

  public authorizedMenus(routes: Routes): Array<MenuItem> {
    return this.authorizedRoutes(routes)
      .filter((r: Route) => r.path !== '')
      .map((r: Route) => { return { path: r.path,
                                    title: r.data.title,
                                    disabledWhenOffline: r.data.disabledWhenOffline,
                                    description: r.data.description,
                                    iconPath: r.data.iconPath }; });
  }

}
