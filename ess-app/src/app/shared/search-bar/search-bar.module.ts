import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOptionModule,
         MatInputModule,
         MatAutocompleteModule,
         MatIconModule } from '@angular/material';

import { SearchBarLgComponent } from './search-bar-lg/search-bar-lg.component';
import { SearchBarXsComponent } from './search-bar-xs/search-bar-xs.component';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatOptionModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  declarations: [
    SearchBarLgComponent,
    SearchBarXsComponent,
    SearchBarComponent
  ],
  exports: [
    SearchBarLgComponent,
    SearchBarXsComponent
  ]
})
export class SearchBarModule { }
