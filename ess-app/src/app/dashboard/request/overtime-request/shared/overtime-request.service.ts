import { Injectable } from '@angular/core';

import { DataService } from './../../../../core/data.service';
import { ApiService } from './../../../../core/network/api.service';
import { FormRequest } from './../../shared/request.interface';

@Injectable()
export class OvertimeRequestService extends DataService<FormRequest> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint('/overtime-requests', FormRequest);
  }



}
