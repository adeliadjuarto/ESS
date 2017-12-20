import { Injectable } from '@angular/core';

import { mapKeys } from 'lodash';

import { environment } from './../../../../../environments/environment';
import { DataService } from './../../../../core/data.service';
import { ApiService } from './../../../../core/network/api.service';
import { FormRequest } from './../../shared/request.interface';

declare var idbKeyval;
const key = 'pwa-sync';

@Injectable()
export class OvertimeRequestService extends DataService<FormRequest> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint('/overtime-requests', FormRequest);
  }

    createRequest(request) {
    let url = `${environment.apiUrl}${this.endpoint}`;
    let requestWrapper = { url: url, request: request };
    this.sendRequest(requestWrapper);
  }

  sendRequest(request) {
    this.addToSync(request)
        .then(msg => navigator.serviceWorker.ready)
        .then(reg => this.registerSyncEvent(reg))
        .catch(() => console.log('meh'))
        .catch(() => {
          let requestForm = new FormData();
          mapKeys(request.request, (value, mapKey) => {requestForm.append(mapKey, value)});
          this.create(requestForm);
        });
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
      .catch(() => console.log('Sync - registration failed'));
  }



}
