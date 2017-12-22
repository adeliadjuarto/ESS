/**
 * Created by glenn on 7/31/17.
 */

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app.reducer';
import { GENERAL } from '../../core/constant/index';
import { AuthenticationResult } from '../../core/network/authentication/authentication-result.interface';
import { AuthenticationService } from '../../core/network/authentication/authentication.service';
import { LoginToken } from '../../core/network/authentication/token/login-token.model';
import { TokenService } from '../../core/network/authentication/token/token.service';
import { Credential } from '../../core/network/shared/model/credential.model';
import { AuthenticationAction } from './login.action';
import { UserAction } from './../../dashboard/account/shared/user.action';
import { LoginState } from './login.reducer';

@Injectable()
export class LoginService {

  public get isLoggedIn(): boolean {
    return this.token.exists(GENERAL.TOKEN.SESSION) && this.token.exists(GENERAL.TOKEN.USER);
  }

  public get observable(): Observable<LoginState> {
    return this.store.select((state: AppState) => state.loginState);
  }

  constructor(protected store: Store<AppState>,
              protected token: TokenService,
              protected authentication: AuthenticationService) { }

  public initialize() {
    this.store.dispatch({ type: AuthenticationAction.INIT });
  }

  public login(credential: Credential) {
    this.store.dispatch({ type: AuthenticationAction.LOGIN_BEGIN });

    this.authentication.authenticate(Object.assign({}, credential))
      .subscribe((result: AuthenticationResult) => {
        this.store.dispatch({ type: AuthenticationAction.LOGIN_COMPLETE, payload: result });

        if (result.success && result.data) {
          console.log(result.data);
          this.store.dispatch({ type: UserAction.CHANGE_USER, payload: result.data.id});
          let token: LoginToken = new LoginToken(Math.random().toString(36).substr(2, 5));
          this.token.store(GENERAL.TOKEN.SESSION, token);
          this.token.store(GENERAL.TOKEN.USER, result.data);
        }
      });
  }

  public logout() {
    this.token.remove(GENERAL.TOKEN.USER);
    this.token.remove(GENERAL.TOKEN.SESSION);

    this.authentication.invalidate()
      .subscribe(() => {});
  }

  public changePassword(data: { oldPassword: string; newPassword: string; confirmPassword: string; }) {
    this.store.dispatch({ type: AuthenticationAction.CHANGE_PASSWORD_BEGIN });
    this.authentication.changePassword(data)
      .subscribe((result: AuthenticationResult) => {
        this.store.dispatch({ type: AuthenticationAction.CHANGE_PASSWORD_COMPLETE, payload: result });
      });
  }

}
