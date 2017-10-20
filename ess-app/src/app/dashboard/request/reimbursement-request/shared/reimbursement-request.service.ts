import { Injectable } from '@angular/core';

import { DataService } from './../../../../core/data.service';
import { ApiService } from './../../../../core/network/api.service';
import { FormRequest } from './../../shared/request.interface';

@Injectable()
export class ReimbursementRequestService extends DataService<FormRequest> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint('/reimbursement-requests', FormRequest);
  }



}
