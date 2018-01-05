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

  searchQuery: string = '';
  searchQuery$: Subject<string> = new Subject<string>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  doInput(input: string) {
    if (input !== '') {
      this.searchQuery$.next(input.toUpperCase());
    } else {
      this.searchQuery$.next('');
    }
  }

  resetSearch() {
    this.searchQuery$.next('');
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
