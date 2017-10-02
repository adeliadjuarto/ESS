import { NgModule } from '@angular/core';

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdMenuModule,
  MdSidenavModule,
  MdGridListModule,
  MdToolbarModule,
  MdDatepickerModule
} from '@angular/material';

@NgModule({
  imports: [
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdMenuModule,
    MdSidenavModule,
    MdGridListModule,
    MdToolbarModule,
    MdDatepickerModule
  ],
  declarations: [
  ],
  exports: [
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdMenuModule,
    MdSidenavModule,
    MdGridListModule,
    MdToolbarModule,
    MdDatepickerModule
  ]
})
export class MaterialModule { }
