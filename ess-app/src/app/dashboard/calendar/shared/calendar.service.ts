import { Injectable } from '@angular/core';

import { ApiService } from './../../../core/network/api.service';
import { ENDPOINT } from './../../../core/constant/index';
import { Event } from './event.model';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';
import { DataService } from './../../../core/data.service';

@Injectable()
export class CalendarService extends DataService<Event> {

  constructor(apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.CALENDAR, Event);
  }

  fetchEvents() {
    return this.apiService.get(this.endpoint)
                          .map(response => response.to(ResponseType.Json))
  }

}
