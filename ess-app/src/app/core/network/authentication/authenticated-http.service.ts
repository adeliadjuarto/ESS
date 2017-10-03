/**
 * Created by glenn on 8/14/17.
 */

import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { NotificationType } from '../../../shared/notification/notification.enum';
import { NotificationService } from '../../../shared/notification/notification.service';
import { GENERAL, HttpStatus, PATH } from '../../constant/index';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthenticatedHttpService extends Http {

  public static readonly InvalidHttpStatus: Array<HttpStatus> = [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN];

  constructor(backend: XHRBackend,
              defaultOptions: RequestOptions,
              protected notification: NotificationService,
              protected token: TokenService,
              protected router: Router) {
    super(backend, defaultOptions);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch((error: Response) => {
        if (AuthenticatedHttpService.InvalidHttpStatus.find((status: HttpStatus) => error.status === status.code)) {

          this.token.remove(GENERAL.TOKEN.USER);
          this.token.remove(GENERAL.TOKEN.SESSION);

          this.notification.show('Session expires. Please login to continue', NotificationType.Warning);
          this.router.navigateByUrl(`${PATH.ROOT}${PATH.LOGIN}`);
        }

        return Observable.throw(error);
      });
  }

}
