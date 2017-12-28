import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { List } from './../core/network/shared/model';
import { Response } from './../core/network/response.interface';
import { ApiService } from './../core/network/api.service';
import { HttpRequest } from './../core/network/http-request';
import { HttpResponse } from './../core/network/http-response';
import { ResponseType } from './../core/network/serializer/response-type.abstract';


@Injectable()
export abstract class DataService<T> {

  protected endpoint = '';
  protected model;

  constructor(protected apiService: ApiService) { }

  protected setEndpoint(endpoint, model) {
    this.endpoint = endpoint;
    this.model = model;
  }

  fetchAll(filter: any = {}): Observable<Array<T>> {
    return this.apiService.get(this.endpoint, (request) => {
                                request.setQuery(filter); })
                          .map((response: Response) => response.to(ResponseType.list));
  }

  fetch(id: string): Observable<T> {
    let endpoint = `${this.endpoint}/${id}`;

    return this.apiService.get(endpoint)
                          .map((response: Response) => response.to(ResponseType.of(this.model)));
  }

  create(entity): Observable<any> {
    return this.apiService.post(this.endpoint, entity)
                          .map((response: any) => {
                            return response.to(ResponseType.Text)
                          });
  }

}
