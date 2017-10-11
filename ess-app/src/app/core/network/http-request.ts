import { Headers, Http, Request as AngularRequest, RequestOptions, Response as AngularResponse, ResponseContentType, URLSearchParams } from '@angular/http';

import { isString } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HttpMethod, RequestMethod } from '../constant/index';
import { HttpResponse } from './http-response';
import { Response } from './response.interface';
import { Request } from './request.interface';

export class HttpRequest implements Request {

  public get observable(): Observable<Response> {
    return this.subject.asObservable();
  }

  public get url(): string { return this.options.url; }
  public set url(value) { this.options.url = value; }

  protected options: RequestOptions = new RequestOptions();
  protected subject: Subject<Response> = new Subject<Response>();

  constructor(url: string) {
    this.url = url;
    this.options.method = RequestMethod.Get.toString().toUpperCase();
    this.options.params = new URLSearchParams();
    this.options.headers = new Headers();
  }

  setQuery(query: any | string): void {
    if (isString(query)) {
      this.options.params = new URLSearchParams(query);
    } else {
      Object.keys(query).forEach((key: string) => {
        this.options.params.set(key, query[key]);
      });
    }
  }

  setMethod(method: HttpMethod|string): void {
    this.options.method = method.toString().toUpperCase();
  }

  setBody(content: any): void {
    this.options.body = content;
  }

  addHeader(name: string, value: string): void {
    this.options.headers.append(name, value);
  }

  removeHeader(name: string): void {
    this.options.headers.delete(name);
  }

  dispatch(http: Http): Observable<Response> {
    http.request(this.build()).subscribe(
      this.handleCompletion.bind(this), this.handleError.bind(this),
      () => { this.subject.complete(); }
    );

    return this.observable;
  }

  protected handleCompletion(response: AngularResponse) {
    this.subject.next(new HttpResponse(response));
  }

  protected handleError(response: AngularResponse) {
    this.subject.error(new HttpResponse(response));
  }

  private build(): AngularRequest {
    this.options.responseType = ResponseContentType.ArrayBuffer;
    // this.options.withCredentials = true;
    return new AngularRequest(this.options);
  }

}
