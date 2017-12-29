import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { NotificationModule } from './notification/notification.module';
import { CircularRangeSliderComponent } from './circular-range-slider/circular-range-slider.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { LoadingComponent } from './loading/loading.component';
import { SearchBarModule } from './search-bar/search-bar.module';
import { SearchFilterModule } from './search-filter/search-filter.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SearchBarModule,
    SearchFilterModule
  ],
  exports: [
    NotificationModule,
    MaterialModule,
    SearchBarModule,
    SearchFilterModule,
    PdfViewerComponent,
    EmptyStateComponent,
    InfoCardComponent,
    LoadingComponent
  ],
  declarations: [
    CircularRangeSliderComponent,
    PdfViewerComponent,
    EmptyStateComponent,
    InfoCardComponent,
    LoadingComponent
  ]
})
export class UIModule { }
