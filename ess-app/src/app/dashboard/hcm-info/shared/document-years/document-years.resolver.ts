import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { DocumentYearsService } from './document-years.service';

@Injectable()
export class DocumentYearsResolve implements Resolve<any> {

  constructor(private yearService: DocumentYearsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let category = route.parent.routeConfig.path;
    return this.yearService.fetchYears(category);
  }

}
