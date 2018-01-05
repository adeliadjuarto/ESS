import { Injectable } from '@angular/core';

import { mapKeys } from 'lodash';

import { ENDPOINT } from './../../../../core/constant/index';
import { environment } from './../../../../../environments/environment';
import { RequestService } from './../../shared/request.service';
import { ApiService } from './../../../../core/network/api.service';
import { FormRequest } from './../../shared/request.interface';
import { NotificationService } from './../../../../shared/notification/notification.service';
import { NotificationType } from './../../../../shared/notification/notification.enum';

@Injectable()
export class LeaveRequestService extends RequestService {

  constructor(apiService: ApiService,
              notification: NotificationService) {
    super(apiService, notification);
    super.setEndpoint(ENDPOINT.REQUEST.LEAVE, FormRequest);
  }

}
