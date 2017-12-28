import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/throw';

import { isFunction } from 'util';
import { ContactsAction } from './contacts.action';
import { ApiService } from './../../../core/network/api.service';
import { ContactsService } from './contacts.service';

const mockRequest = { setQuery: () => { } };
const mockApiService = jasmine.createSpyObj('apiService', ['get']);
const mockStore = jasmine.createSpyObj('store', ['dispatch']);
const mockResponse = jasmine.createSpyObj('Response', ['to']);

const mockContact = {
  content: [{
    nip: '123',
    name: 'mockEmployee',
    jobTitle: {},
    branch: {},
    region: {},
    isEmergency: true,
    phoneNumber: []
  }]
};

describe('ContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ContactsService,
        { provide: ApiService, useValue: mockApiService },
        { provide: Store, useValue: mockStore }]
    });
  });

  it('should be created', inject([ContactsService], (service: ContactsService) => {
    expect(service).toBeTruthy();
  }));

  it('should dispatch result correctly on fetchAllContacts', inject([ContactsService], (service: ContactsService) => {
    mockStore.dispatch.calls.reset();
    let filter = { };

    spyOn(service, 'fetchContacts').and.returnValue(Observable.of(mockContact));
    service.fetchAllContacts(filter);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch.calls.argsFor(0)).toEqual([{
      type: ContactsAction.FETCH_CONTACTS_SUCCESS,
      payload: mockContact.content
    }]);
  }));

  it('should dispatch result correctly on fetchPagedContacts', inject([ContactsService], (service: ContactsService) => {
    mockStore.dispatch.calls.reset();

    let page = 0;
    service.totalPage = 2;

    spyOn(service, 'fetchContactsNext').and.returnValue(Observable.of(mockContact));
    service.fetchPagedContacts(page++);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
    expect(mockStore.dispatch.calls.argsFor(0)).toEqual([{
      type: ContactsAction.FETCH_CONTACTS_BEGIN
    }]);
    expect(mockStore.dispatch.calls.argsFor(1)).toEqual([{
      type: ContactsAction.FETCH_CONTACTS_SUCCESS,
      payload: mockContact.content
    }]);

    mockStore.dispatch.calls.reset();

    service.fetchPagedContacts(page++);

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch.calls.argsFor(0)).toEqual([{
      type: ContactsAction.FETCH_CONTACTS_SUCCESS,
      payload: mockContact.content
    }]);
  }));

  it('should dispatch result correctly on fetch error', inject([ContactsService], (service: ContactsService) => {
    mockStore.dispatch.calls.reset();

    let page = 0;
    service.totalPage = 2;

    spyOn(service, 'fetchContactsNext').and.returnValue(Observable.throw(Error));
    service.fetchPagedContacts(page++);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
    expect(mockStore.dispatch.calls.argsFor(0)).toEqual([{
      type: ContactsAction.FETCH_CONTACTS_BEGIN
    }]);
    expect(mockStore.dispatch.calls.argsFor(1)).toEqual([{
      type: ContactsAction.FETCH_CONTACTS_ERROR,
      payload: Error
    }]);
  }));

  it('should dispatch result correctly on fetchEmergencyContacts', inject([ContactsService], (service: ContactsService) => {
    mockStore.dispatch.calls.reset();

    spyOn(service, 'fetchEmergencyContactList').and.returnValue(Observable.of(mockContact));
    service.fetchEmergencyContacts();
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch.calls.argsFor(0)).toEqual([{
      type: ContactsAction.FETCH_CONTACTS_SUCCESS,
      payload: mockContact.content
    }]);
  }));
});
