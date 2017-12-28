import { Injectable } from '@angular/core';

import { mapKeys } from 'lodash';

import { ENDPOINT } from './../../../../core/constant/index';
import { environment } from './../../../../../environments/environment';
import { DataService } from './../../../../core/data.service';
import { ApiService } from './../../../../core/network/api.service';
import { FormRequest } from './../../shared/request.interface';
import { NotificationService } from './../../../../shared/notification/notification.service';
import { NotificationType } from './../../../../shared/notification/notification.enum';

declare var idbKeyval;
const key = 'pwa-sync';

@Injectable()
export class LeaveRequestService extends DataService<FormRequest> {

  constructor(apiService: ApiService,
              private notification: NotificationService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.REQUEST.LEAVE, FormRequest);
  }

  createRequest(request) {
    let url = `${environment.apiUrl}${this.endpoint}`;
    let requestWrapper = { url: url, request: request };
    this.sendRequest(requestWrapper);
  }

  sendRequest(request) {
    if (!navigator.onLine) {
      this.addToSync(request)
          .then(msg => navigator.serviceWorker.ready)
          .then(reg => this.registerSyncEvent(reg))
          .catch(() => console.log('meh'))
          .catch(() => {
            let requestForm = new FormData();
            mapKeys(request.request, (value, mapKey) => {requestForm.append(mapKey, value)});
            this.create(requestForm);
          });
    } else {
      let requestForm = new FormData();
      mapKeys(request.request, (value, mapKey) => {requestForm.append(mapKey, value)});
      this.create(requestForm).subscribe(data => this.notification.show(data));
    }
  }

  addToSync(request) {
    return idbKeyval
      .get(key)
      .then(data => this.addMessageToArray(data, request))
      .then(requests => {
        idbKeyval.set(key, requests);
      })
  }

  private addMessageToArray(data, message) {
    data = data || [];
    const messages: Array<any> = data || new Array();
    messages.push(message);
    return messages;
  }

  private registerSyncEvent(reg) {
    return reg.sync
      .register('pwa-request-sync')
      .then(() => console.log('Sync - registered for pwa-sync'))
      .then(() => {
        if (!navigator.onLine) {
          this.notification.show('Offline! Request is queued', NotificationType.Error);
        }
      })
      .catch(() => console.log('Sync - registration failed'));
  }


}
