import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFilterService } from './search-filter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ SearchFilterService ]
})
export class SearchFilterModule { }
