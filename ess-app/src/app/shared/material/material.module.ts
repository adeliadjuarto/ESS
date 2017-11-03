import { NgModule } from '@angular/core';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatGridListModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule,
  MatTabsModule
} from '@angular/material';
import 'hammerjs/hammer';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTabsModule
  ],
  declarations: [
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTabsModule
  ],

})
export class MaterialModule { }
