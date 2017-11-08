import { Injectable } from '@angular/core';

import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Authority } from './shared/authority.model';
import { User } from '../../../dashboard/account/shared/user.model';
import { ENDPOINT } from '../../constant/index';
import { ApiService } from '../api.service';
import { Response } from '../response.interface';
import { ResponseType } from '../serializer/response-type.abstract';
import { Credential, Error } from '../shared/model/index';
import { AuthenticationResult } from './authentication-result.interface';

@Injectable()
export class AuthenticationService {

  constructor(protected connection: ApiService) { }

  public authenticate(credential: Credential): Observable<AuthenticationResult> {
    let subject: Subject<AuthenticationResult> = new Subject<AuthenticationResult>();

    let body: FormData = new FormData();
    body.append('username', credential.identifier);
    body.append('password', credential.secret);

    this.connection.post(ENDPOINT.LOGIN, body)
      .subscribe((response: Response) => {
        let raw: any = response.content;
        let user: User = cloneDeep(raw);
        // user.authorities = cloneDeep(raw.group.authorities) || Array<Authority>();

        subject.next({ success: true, message: null, data: user });
        subject.complete();
      }, (response: Response) => {
        let error: Error = Object.assign(new Error(), response.to(ResponseType.of(Error)));
        subject.next({ success: false, message: error.message });
        subject.complete();
      });

    return subject.asObservable();
  }

  public invalidate(): Observable<AuthenticationResult> {
    let subject: Subject<AuthenticationResult> = new Subject<AuthenticationResult>();

    this.connection.post(ENDPOINT.LOGOUT)
      .subscribe(() => {
        subject.next({ success: true, message: null });
        subject.complete();
      }, (response: Response) => {
        let error: Error = Object.assign(new Error(), response.to(ResponseType.of(Error)));
        subject.next({ success: false, message: error.message });
        subject.complete();
      });

    return subject.asObservable();
  }

  public changePassword(data: any): Observable<AuthenticationResult> {
    let subject: Subject<AuthenticationResult> = new Subject<AuthenticationResult>();
    this.connection
      .post(`${ENDPOINT.USER}${ENDPOINT.CHANGE_PASSWORD}`, data)
      .subscribe(() => {
        subject.next({ success: true, message: null });
        subject.complete();
      }, (response: Response) => {
        let error: Error = Object.assign(new Error(), response.to(ResponseType.of(Error)));
        subject.next({ success: false, message: error.message });
        subject.complete();
      });

    return subject.asObservable();
  }

}
