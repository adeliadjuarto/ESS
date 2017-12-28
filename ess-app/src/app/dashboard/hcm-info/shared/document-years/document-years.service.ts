import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ENDPOINT } from './../../../../core/constant';
import { Serializer, ListSerializer, TextSerializer } from './../../../../core/network/serializer';
import { DataService } from './../../../../core/data.service';
import { ApiService } from './../../../../core/network/api.service';
import { HttpRequest } from './../../../../core/network/http-request';
import { Response } from './../../../../core/network/response.interface';
import { ResponseType } from './../../../../core/network/serializer/response-type.abstract';

@Injectable()
export class DocumentYearsService extends DataService<String> {

  private listSerializer: Serializer = new ListSerializer(String);

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.FILTERS.DOCUMENT_YEARS, String);
   }

   fetchYears(category: string): Observable<any> {
     let param = { category: category.replace(/\W/g, '') };
     return this.apiService.get(this.endpoint, (request) => {
                              request.setQuery(param);
                            })
                           .map((response: Response) => response.to(ResponseType.Json));
   }

}
