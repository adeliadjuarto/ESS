import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { MedicalInfoService } from './medical-info.service';

@Injectable()
export class ProviderResolve implements Resolve<any> {

  constructor(private medicalInfoService: MedicalInfoService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.medicalInfoService.fetchProvider(route.params['id']);
  }

}
