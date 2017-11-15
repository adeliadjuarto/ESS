import { Injectable } from '@angular/core';

import { DataService } from './../../../core/data.service';
import { Payroll } from './payroll.model';
import { ApiService } from './../../../core/network/api.service';
import { ENDPOINT } from './../../../core/constant';

@Injectable()
export class PayrollService extends DataService<Payroll> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.PAYROLL, Payroll);
  }

}
