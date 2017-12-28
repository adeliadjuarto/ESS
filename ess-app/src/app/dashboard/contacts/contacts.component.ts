import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';

import { Contact } from './shared/contact.model';
import { AppState } from '../../app.reducer';
import { ContactsAction as Actions } from './shared/contacts.action';
import { SearchBarLgComponent } from './../../shared/search-bar/search-bar-lg/search-bar-lg.component';
import { ContactsService } from './shared/contacts.service';
import { Filter } from './../../shared/search-bar/search-bar.component';
import { FILTER } from './../../core/constant';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [SearchBarLgComponent]
})

export class ContactsComponent implements OnInit, AfterViewInit {

  @ViewChild(SearchBarLgComponent) searchBarLgComponent: SearchBarLgComponent;

  alphabets: any[] = [];
  positions: any[] = [];
  results: any[][] = [];
  searchToggle: boolean = false;
  queryExists: boolean = false;
  filterExists: boolean = false;
  selectedFilters: any;
  searchQuery: string;
  searchQueryFilter: any;
  isLoading: boolean;

  employees: Array<Contact>;
  filteredEmployees: Array<Contact>;
  page: number = 0;
  firstPage: number = 0;
  emergencyContactsToggle: boolean = false;
  public icon: string = 'warning';

  filters: Filter[] = [];

  constructor(private router: Router,
              private contactsService: ContactsService,
              private store: Store<any>,
              private route: ActivatedRoute ) {

    this.fetchFirstPage();
    this.store.select((obj: AppState) => obj.contactsState)
      .subscribe((contactsState) => {
        if (contactsState) {
          this.isLoading = contactsState.loading;
          this.employees = contactsState.employeeData;
          this.groupContacts(this.employees);
        }
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchBarLgComponent.query$
        .subscribe((query) => {
        this.queryExists = (query !== '' && query !== undefined);
        if (query) {
          this.searchQueryFilter = { name: query };
        } else if (query === '') {
          this.searchQueryFilter = {};
        }
        this.search();
      });
    this.searchBarLgComponent.searchToggle$
      .subscribe(toggle => {
        this.searchToggle = toggle;
        if (!this.searchToggle && !this.emergencyContactsToggle) {
          this.searchQueryFilter = {};
          this.fetchFirstPage();
        };
      });
    this.searchBarLgComponent.selectedFilters$
      .subscribe((filters) => {
        this.filterExists = !isEmpty(filters);
        this.selectedFilters = filters;
        this.search();
      });
  }

  search() {
    if (!this.emergencyContactsToggle) {
      this.reset();
      let filter = Object.assign({}, this.searchQueryFilter, this.selectedFilters);
      this.filterEmployee(filter);
    }
  }

  filterEmployee(filter) {
    this.contactsService.fetchAllContacts(filter);
  }

  fetchFirstPage() {
    this.reset();
    this.contactsService.fetchPagedContacts(this.page = this.firstPage);
  }

  reset() {
    this.results = [];
    this.alphabets = [];
    this.store.dispatch({type: Actions.RESET});
  }

  fetchContacts(emergency: boolean) {
    if (emergency) {
      this.searchBarLgComponent.resetSearch();
      this.icon = null;
    } else {
      this.fetchFirstPage();
      this.icon = 'warning';
    }
  }

  toggleEmergencyContacts() {
    this.emergencyContactsToggle = !this.emergencyContactsToggle;
    this.reset();
    this.fetchContacts(this.emergencyContactsToggle);
  }

  groupContacts(contacts: Array<Contact>) {
    let initialAlphabet;
    for (let i = 0; i < contacts.length; i++) {
      initialAlphabet = '' + contacts[i].name.charAt(0);
      if (this.results[initialAlphabet] === undefined) {
        this.alphabets.push(initialAlphabet);
        this.results[initialAlphabet] = [];
      }
      this.results[initialAlphabet].push(contacts[i]);
    }
    this.alphabets.sort();
  }

  redirectToDetails(key) {
    this.router.navigate([key], { relativeTo: this.route });
  }

  onScroll() {
    this.page++;
    this.contactsService.fetchPagedContacts(this.page);
  }

  public get isSearching() {
    return this.queryExists || this.filterExists;
  }

  public get buttonTitle(): string {
    return `${this.emergencyContactsToggle ? 'All' : 'Emergency'}`;
  }

  public get isEmpty(): boolean {
    return this.employees.length === 0;
  }
}
