import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOptionModule,
         MatInputModule,
         MatAutocompleteModule,
         MatIconModule } from '@angular/material';

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
    SearchBarComponent
  ],
  exports: [
  ]
})
export class SearchBarModule { }
