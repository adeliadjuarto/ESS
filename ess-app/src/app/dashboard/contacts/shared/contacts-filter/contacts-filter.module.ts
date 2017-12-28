import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionsResolve } from './regions.resolver';
import { JobTitlesResolve } from './job-titles.resolver';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    RegionsResolve,
    JobTitlesResolve
  ]
})
export class ContactsFilterModule { }
