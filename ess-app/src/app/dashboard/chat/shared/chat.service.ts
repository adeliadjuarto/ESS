import { Injectable } from '@angular/core';

import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';

@Injectable()
export class ChatService extends DataService<String> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint('/parse', String);
  }

  parse(text: string) {
    return this.apiService.get(this.endpoint, (request) => {request.setQuery({query: text})})
                   .map(response => response.content);
  }



}
