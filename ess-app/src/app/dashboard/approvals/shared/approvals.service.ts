import { Injectable } from '@angular/core';

import { DataService } from './../../../core/data.service';
import { Status } from './status.model';
import { ApiService } from './../../../core/network/api.service';
import { ENDPOINT } from './../../../core/constant';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';

@Injectable()
export class ApprovalsService extends DataService<Status> {

  constructor(apiService: ApiService) {
    super(apiService);
  }

}
