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
  MdSelectModule,
  MdDatepickerModule,
  MdNativeDateModule
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
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule
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
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],

})
export class MaterialModule { }
