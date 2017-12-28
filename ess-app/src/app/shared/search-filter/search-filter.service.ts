import { Injectable } from '@angular/core';

import { DataService } from './../../core/data.service';
import { ApiService } from './../../core/network/api.service';
import { ResponseType } from './../../core/network/serializer/response-type.abstract';
import { FilterItem } from './filter-item.model';

@Injectable()
export class SearchFilterService extends DataService<FilterItem> {

  constructor(apiService: ApiService) {
    super(apiService);
  }

  fetchFilter(endpoint: string) {
    return this.apiService.get(endpoint)
                          .map(response => response.to(ResponseType.Json));
  }

}
