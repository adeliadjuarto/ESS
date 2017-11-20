import { Injectable } from '@angular/core';

import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';

@Injectable()
export class ChatService extends DataService<String> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint('/chat', String);
  }

  parse(text: string) {
    return this.apiService.get(this.endpoint, (request) => {request.setQuery({m: text})})
                   .map(response => response.content);
  }

  newMessage() {
    return this.apiService.get(`/chat/new`)
                          .map(response => response.content);
  }

}
