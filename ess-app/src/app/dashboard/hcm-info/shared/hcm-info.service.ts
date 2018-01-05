import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ENDPOINT } from './../../../core/constant';
import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';
import { HttpRequest } from './../../../core/network/http-request';
import { Response } from './../../../core/network/response.interface';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';
import { Document } from './document.model';
import { DocumentsAction as Actions } from './hcm-info.action';

@Injectable()
export class HcmInfoService extends DataService<Document> {

  constructor(private store: Store<any>,
              apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.DOCUMENTS, Document);
  }

  fetchAllDocuments(filter) {
    this.fetchDocumentsList(filter).subscribe(
      this.fetchDocumentsSuccess.bind(this)
    );
  }

  fetchDocumentsList(filter: any = {}): Observable<any> {
    return this.apiService.get(this.endpoint, (request) => {
                                request.setQuery(filter); })
                          .map((response: Response) => response.to(ResponseType.Json));
  }

  fetchDocumentsSuccess(result) {
    this.store.dispatch({
      type: Actions.UPDATE_DOCUMENTLIST,
      payload: result
    });
  }

}
