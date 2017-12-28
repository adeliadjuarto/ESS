import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ContactsAction as Actions } from './contacts.action';
import { Contact } from './contact.model';
import { ENDPOINT } from './../../../core/constant';
import { DataService } from './../../../core/data.service';
import { ApiService } from './../../../core/network/api.service';
import { Request } from './../../../core/network/request.interface';
import { Response } from './../../../core/network/response.interface';
import { ResponseType } from './../../../core/network/serializer/response-type.abstract';

@Injectable()
export class ContactsService extends DataService<Contact> {

  totalPage: number = 0;

  constructor(private store: Store<any>,
              apiService: ApiService) {
    super(apiService);
    super.setEndpoint(ENDPOINT.CONTACTS, Contact);
  }

  fetchAllContacts(filter) {
    this.fetchContacts(filter).subscribe(
      this.fetchContactsSuccess.bind(this),
      this.fetchContactsError.bind(this)
    );
  }

  fetchPagedContacts(page?) {
    if (page === 0 || this.totalPage === 0) {
      this.store.dispatch({type: Actions.FETCH_CONTACTS_BEGIN});
    }
    if (page < this.totalPage || this.totalPage === 0) {
      this.fetchContactsNext(page).subscribe(
        this.fetchContactsSuccess.bind(this),
        this.fetchContactsError.bind(this)
      );
    }
  }

  fetchContacts(filter: any = {}): Observable<any> {
    return super.fetchAll(filter);
  }

  fetchContactsSuccess(result) {
    if (this.totalPage === 0) {
      this.totalPage = result.totalPages;
    }
    this.store.dispatch({
      type: Actions.FETCH_CONTACTS_SUCCESS,
      payload: result.content,
    });
  }

  fetchContactsError(result) {
    this.store.dispatch({
      type: Actions.FETCH_CONTACTS_ERROR,
      payload: result
    })
  }

  fetchContactsNext(page?: number) {
    let currentPage = page ? page : 0;

    let param = {
      page: currentPage,
      size: 20,
    };

    return this.apiService.get(this.endpoint, (request: Request) => {
                            request.setQuery(param);
                          })
                          .map((response: Response) => response.to(ResponseType.list));
  }

  fetchEmergencyContacts() {
    this.fetchEmergencyContactList().subscribe(
      this.fetchContactsSuccess.bind(this)
    );
  }

  fetchEmergencyContactList() {
    let endpoint = `${this.endpoint}/${ENDPOINT.SUFFIX.EMERGENCY}`;

    return this.apiService.get(endpoint)
                          .map((response: Response) => response.to(ResponseType.list));

  }

}
