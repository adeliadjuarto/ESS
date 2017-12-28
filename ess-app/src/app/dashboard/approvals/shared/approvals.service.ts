import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';
import { ENDPOINT } from './../../../core/constant/index';
import { Request } from './../../../core/network/request.interface';
import { Response } from './../../../core/network/response.interface';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';
import { Approvals } from './approvals.model';
import { ApprovalsAction as Actions } from './approvals.action';

@Injectable()
export class ApprovalsService extends DataService<Approvals> {

  constructor(private store: Store<any>,
              apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.REQUEST.LEAVE, Approvals);
  }

  fetchApprovals(endpointType, param?) {
    this.store.dispatch({type: Actions.FETCH_APPROVALS_BEGIN});

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
      type: Actions.FETCH_APPROVALS_SUCCESS,
      payload: result,
    });
  }

  fetchApprovalStatusError(result) {
    this.store.dispatch({
      type: Actions.FETCH_APPROVALS_ERROR,
      payload: result,
    });
  }

  approveRequest(url, note?) {
    let form = new FormData();
    form.append('notes', note);
    return this.apiService.post(url, form)
                          .map((response: Response) => response.to(ResponseType.Text));
  }

}
