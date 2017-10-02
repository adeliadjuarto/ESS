/**
 * Created by glenn on 11/9/16.
 */

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpMethod } from '../constant/index';
import { Response } from './response.interface';

export interface Request {

  readonly observable: Observable<Response>;
  url: string;

  setMethod(method: HttpMethod|string): void;
  setQuery(query: any | string): void;
  setBody(content: any): void;
  addHeader(name: string, value: string): void;
  removeHeader(name: string): void;

  dispatch(http: Http): Observable<Response>;

}

