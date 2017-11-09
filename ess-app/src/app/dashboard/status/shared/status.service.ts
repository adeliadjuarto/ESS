import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';
import { ENDPOINT } from './../../../core/constant/index';
import { Request } from './../../../core/network/request.interface';
import { Response } from './../../../core/network/response.interface';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';
import { Status } from './status.model';
import { StatusAction as Actions } from './status.action';

@Injectable()
export class StatusService extends DataService<Status> {

  constructor(private store: Store<any>,
              apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.REQUEST.LEAVE, Status);
  }

  fetchApprovals(endpointType, param?) {
    this.store.dispatch({type: Actions.FETCH_STATUS_BEGIN});

    this.fetchApprovalStatus(endpointType, param).subscribe(
      this.fetchApprovalStatusSuccess.bind(this),
      this.fetchApprovalStatusError.bind(this)
    );
  }

  fetchApprovalStatus(endpoint, param?) {
    return this.apiService.get(endpoint, (request: Request) => {
                              if (param) {
                                request.setQuery(param);
                              }
                          })
                          .map((response: Response) => response.to(ResponseType.Json));
  }

  fetchApprovalStatusSuccess(result) {
    this.store.dispatch({
      type: Actions.FETCH_STATUS_SUCCESS,
      payload: result,
    });
  }

  fetchApprovalStatusError(result) {
    this.store.dispatch({
      type: Actions.FETCH_STATUS_ERROR,
      payload: result,
    });
  }

}
