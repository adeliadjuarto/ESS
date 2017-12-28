import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Directive, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from './../../shared/material/material.module';
import { UITestingModule } from './../../testing/ui-testing.module';
import { Contact } from './shared/contact.model';
import { AppState } from '../../app.reducer';
import { ContactsAction as Actions } from './shared/contacts.action';
import { SearchBarLgComponent } from './../../shared/search-bar/search-bar-lg/search-bar-lg.component';
import { ContactsService } from './shared/contacts.service';
import { Filter } from './../../shared/search-bar/search-bar.component';
import { FILTER } from './../../core/constant';

import { ContactsComponent } from './contacts.component';

const mockRouter = jasmine.createSpyObj('router', ['navigate']);
const mockService = jasmine.createSpyObj('contactsService', ['fetchPagedContacts', 'fetchAllContacts', 'fetchEmergencyContacts']);
const mockStore = {
  select: jasmine.createSpy('select'),
  dispatch: jasmine.createSpy('dispatch')
};

const mockRoute = {
  snapshot: {
    data: {
      jobTitles: [],
      regions: []
    }
  }
};

const mockContactsState = {
  loading: false,
  employeeData: []
};

mockStore.select.and.returnValue(Observable.of(mockContactsState));

xdescribe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ UITestingModule, MaterialModule, InfiniteScrollModule, BrowserAnimationsModule ],
      declarations: [ ContactsComponent, SearchBarLgComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: ContactsService, useValue: mockService },
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
    expect(mockStore.select).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
    expect(mockStore.dispatch).toHaveBeenCalledWith({type: Actions.RESET});
    expect(mockService.fetchPagedContacts).toHaveBeenCalledWith(0);
  });
});
