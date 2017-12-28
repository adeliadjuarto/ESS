import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { AppState } from './../../app.reducer';

export interface Filter {
  title: string;
  label: string;
  selection: string[];
  selectedFilter?: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @ViewChild('searchBar') searchBar: ElementRef;

  @Input() filters: Filter[] = [];

  searchQuery: string = '';
  searchToggle: boolean = false;
  selectedFilters: Object = {};

  searchQuery$: Subject<string> = new Subject<string>();
  searchToggle$: Subject<boolean> = new Subject<boolean>();
  selectedFilters$: Subject<Object> = new Subject<Object>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onClick(input) {
    if (input === '') {
      this.searchToggle = true;
      this.searchToggle$.next(true);
    }
  }

  doInput(input: string) {
    if (input !== '') {
      this.searchQuery$.next(input.toUpperCase());
      this.searchToggle$.next(true);
      this.searchToggle = true;
    } else {
      this.searchQuery$.next('');
    }
  }

  resetSearch() {
    for (let filter of this.filters) {
      filter.selectedFilter = undefined;
    }

    this.searchQuery$.next('');
    this.selectedFilters$.next({});
    this.searchToggle$.next(false);

    this.searchToggle = false;
    this.searchBar.nativeElement.value = '';
  }

  get query$(): Observable<string> {
    return this.searchQuery$
               .debounceTime(300);
  }

  setFocus() {
    this.searchBar.nativeElement.focus();
  }
}
