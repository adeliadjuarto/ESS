import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { isFunction } from 'util';

import { RequestMethod } from '../constant/index';
import { HttpRequest } from './http-request';
import { Queue, QueueChanges, SyncQueue } from './queue/index';
import { Request } from './request.interface';
import { Response } from './response.interface';

@Injectable()
export class NetworkService {

  private queue: Queue<Request> = new SyncQueue<Request>();

  constructor(protected connection: Http) {
    this.queue.onChange(this.handleQueueChanges.bind(this));
  }

  public send(request: Request): Observable<Response> {
    return this.queue.enqueue(request).observable;
  }

  public create(url: string): Request {
    return new HttpRequest(url);
  }

  public get(url: string, configure?: (request: Request) => void): Observable<Response> {
    return this.request(url, (request: Request) => {
      if (isFunction(configure)) { configure(request); }

      request.setBody(undefined);
      request.setMethod(RequestMethod.Get);
    });
  }

  public post(url: string, body: any = {}, configure?: (request: Request) => void): Observable<Response> {
    return this.request(url, (request: Request) => {
      if (isFunction(configure)) { configure(request); }

      request.setBody(body);
      request.setMethod(RequestMethod.Post);
    });
  }

  public put(url: string, body: any = {}, configure?: (request: Request) => void): Observable<Response> {
    return this.request(url, (request: Request) => {
      if (isFunction(configure)) { configure(request); }

      request.setBody(body);
      request.setMethod(RequestMethod.Put);
    });
  }

  public request(url: string, configure?: (request: Request) => void): Observable<Response> {
    let request = this.create(url);
    if (isFunction(configure)) { configure(request); }

    return this.send(request);
  }

  protected consume(): void {
    if (this.queue.count > 0) {
      let request: Request = this.queue.dequeue();
      this.dispatch(request);
    }
  }

  protected dispatch(request: Request) {
    request.dispatch(this.connection);
  }

  private handleQueueChanges(type: QueueChanges, item: Request): void {
    if (type === QueueChanges.Enqueue || type === QueueChanges.Dequeue) {
      this.consume();
    }
  }

}
