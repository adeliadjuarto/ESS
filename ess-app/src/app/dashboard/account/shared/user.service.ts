import { Injectable } from '@angular/core';

import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ENDPOINT } from '../../../core/constant/index';
import { DataService } from '../../../core/data.service';
import { ApiService } from '../../../core/network/api.service';
import { Response } from '../../../core/network/response.interface';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';
import { Authority } from '../../../core/network/authentication/shared/authority.model';
import { User } from './user.model';

@Injectable()
export class UserService extends DataService<User> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.USER, User);
  }

  public fetchSubordinates(): Observable<User[]> {
    return this.apiService.get(`${this.endpoint}/subordinates`)
      .map((response: Response) => response.to(ResponseType.Json));
  }

}
