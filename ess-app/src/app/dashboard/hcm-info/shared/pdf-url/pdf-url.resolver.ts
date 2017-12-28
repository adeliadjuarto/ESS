import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { PdfUrlService } from './pdf-url.service';

@Injectable()
export class PdfUrlResolve implements Resolve<any> {

  constructor(private service: PdfUrlService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.fetchUrl(route.paramMap.get('id'));
  }

}
