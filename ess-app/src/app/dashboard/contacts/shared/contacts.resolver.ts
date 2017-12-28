import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ContactsService } from './contacts.service';

@Injectable()
export class ContactsResolve implements Resolve<any> {

  constructor(private contactsService: ContactsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let employeeId = route.paramMap.get('id');

    return this.contactsService.fetch(employeeId);
  }

}
