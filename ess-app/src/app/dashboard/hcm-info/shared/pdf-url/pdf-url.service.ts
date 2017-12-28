import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { ENDPOINT } from './../../../../core/constant';
import { DataService } from './../../../../core/data.service';
import { ApiService } from './../../../../core/network/api.service';
import { HttpRequest } from './../../../../core/network/http-request';
import { Response } from './../../../../core/network/response.interface';
import { ResponseType } from './../../../../core/network/serializer/response-type.abstract';

@Injectable()
export class PdfUrlService extends DataService<String> {

  constructor(private store: Store<any>,
              apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.DOCUMENTS, String);
  }

  fetchUrl(documentId: string) {
    let endpoint = `${this.endpoint}/${documentId}/token`;

    let downloadUrl = new URL(ENDPOINT.DOWNLOAD, this.apiService.baseUrl);
    console.log(downloadUrl);

    return this.apiService.get(endpoint)
                      .map((response: Response) => response.to(ResponseType.Text))
                      .map((result) => downloadUrl.toString() + result);
  }

}
