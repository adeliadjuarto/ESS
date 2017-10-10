import { Injectable } from '@angular/core';

import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';
import { FormRequest } from './request.interface';

@Injectable()
export class RequestService extends DataService<FormRequest> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint('/test-upload-file', FormRequest);
  }



}
