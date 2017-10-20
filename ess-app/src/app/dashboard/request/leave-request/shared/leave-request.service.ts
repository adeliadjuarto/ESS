import { Injectable } from '@angular/core';

import { DataService } from './../../../../core/data.service';
import { ApiService } from './../../../../core/network/api.service';
import { FormRequest } from './../../shared/request.interface';

@Injectable()
export class LeaveRequestService extends DataService<FormRequest> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint('/leave-requests', FormRequest);
  }



}
