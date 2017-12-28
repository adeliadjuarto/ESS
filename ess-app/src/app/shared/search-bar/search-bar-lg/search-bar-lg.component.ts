import { Component, OnInit } from '@angular/core';

import { zipObject } from 'lodash';

import { SearchBarComponent } from '../search-bar.component';
import { Filter } from './../search-bar.component';

@Component({
  selector: 'search-bar-lg',
  templateUrl: './search-bar-lg.component.html',
  styleUrls: ['./search-bar-lg.component.scss']
})
export class SearchBarLgComponent extends SearchBarComponent implements OnInit {

  filter(selections: string[], val: string) {
    if (!!val) {
      return selections.filter((option: any) => option.name.toLowerCase().includes(val.toLowerCase()) );
    } else {
      return selections;
    }
  }

  doSelect() {
    let filterLabel = [];
    let filterSelections = [];
    this.filters.map((filter) => {
      if (filter.selectedFilter !== undefined) {
        filterLabel.push(filter.label);
        filterSelections.push(filter.selectedFilter);
      }
    });
    this.selectedFilters = zipObject(filterLabel, filterSelections);
    this.selectedFilters$.next(this.selectedFilters);
  }

  clearSelection(filter) {
    filter.selectedFilter = undefined;
    this.doSelect();
  }

}
