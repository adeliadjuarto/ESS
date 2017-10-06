import { Injectable } from '@angular/core';

import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';
import { Request } from './request.interface';

@Injectable()
export class RequestService extends DataService<Request> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint('/test-upload-file', Request);
  }



}
