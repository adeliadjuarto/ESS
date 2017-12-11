import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { DataService } from './../../../core/data.service';
import { Payroll } from './payroll.model';
import { PayrollAction } from './payroll.action';
import { ApiService } from './../../../core/network/api.service';
import { ENDPOINT } from './../../../core/constant';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';

@Injectable()
export class PayrollService extends DataService<Payroll> {

  constructor(apiService: ApiService,
              private store: Store<any>) {
    super(apiService);
    super.setEndpoint(ENDPOINT.PAYROLL, Payroll);
  };

  fetchPayroll() {
    this.fetchCurrentPayroll().subscribe(this.fetchCurrentPayrollSuccess.bind(this));
    this.fetchLatestPayroll().subscribe(this.fetchLatestPayrollSuccess.bind(this));
  }

  fetchLatestPayroll() {
    let endpoint = `${this.endpoint}${ENDPOINT.SUFFIX.LATEST}`;

    return this.apiService.get(endpoint).map(response => response.to(ResponseType.Json));
  }

  fetchCurrentPayroll() {
    let endpoint = `${this.endpoint}${ENDPOINT.SUFFIX.CURRENT}`;

    return this.apiService.get(endpoint).map(response => response.to(ResponseType.Json));
  }

  fetchLatestPayrollSuccess(result) {
    this.store.dispatch({
      type: PayrollAction.FETCH_LATEST_PAYROLL_SUCCESS,
      payload: result
    })
  }

  fetchCurrentPayrollSuccess(result) {
    this.store.dispatch({
      type: PayrollAction.FETCH_PAYROLL_SUCCESS,
      payload: result
    })
  }

  fetchDocumentDownload(id: string) {
    let endpoint = `${this.endpoint}/${id}/download`;

    return this.apiService.get(endpoint).map(response => response.to(ResponseType.Json));
  }

}
