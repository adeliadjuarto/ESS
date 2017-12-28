import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ENDPOINT } from './../../../core/constant';
import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';
import { Response } from './../../../core/network/response.interface';
import { HttpResponse } from './../../../core/network/http-response';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';
import { Provider } from './../shared/provider.model';
import { MedicalInfoAction as Actions } from './../shared/medical-info.action';

@Injectable()
export class MedicalInfoService extends DataService<Provider> {

  constructor(private store: Store<any>,
              apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.PROVIDERS, Provider);
  }

  fetchProviders(filter) {
    this.store.dispatch({ type: Actions.FETCH_PROVIDERS_LOADING })
    this.fetchProviderDetails(filter).subscribe(
      this.fetchProviderDetailsSuccess.bind(this),
      this.fetchProviderDetailsError.bind(this)
    );
  }

  fetchProviderDetails(filter) {
    return super.fetchAll(filter);
  }

  fetchProviderDetailsSuccess(result) {
    this.store.dispatch({
      type: Actions.FETCH_PROVIDERS_SUCCESS,
      payload: result.content,
    });
  }

  fetchProviderDetailsError(result) {
    this.store.dispatch({
      type: Actions.FETCH_PROVIDERS_ERROR,
      payload: result
    })
  }

  fetchProvider(id) {
    let endpoint = `${this.endpoint}/${id}`;

    return this.apiService.get(endpoint)
                          .map((response: Response) => response.to(ResponseType.Json));
  }

}
