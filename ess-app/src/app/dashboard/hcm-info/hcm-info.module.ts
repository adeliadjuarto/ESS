import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PdfViewerComponent } from './../../shared/pdf-viewer/pdf-viewer.component';
import { SearchBarModule } from './../../shared/search-bar/search-bar.module';
import { UIModule } from './../../shared/user-interface.module';
import { HcmInfoComponent } from './hcm-info.component';
import { PkbComponent } from './pkb/pkb.component';
import { SkViewerComponent } from './sk-se/sk-viewer/sk-viewer.component';
import { SkListComponent } from './sk-se/sk-list/sk-list.component';
import { HcmInfoService } from './shared/hcm-info.service';
import { DocumentYearsService } from './shared/document-years/document-years.service';
import { DocumentYearsResolve } from './shared/document-years/document-years.resolver';
import { PdfUrlResolve } from './shared/pdf-url/pdf-url.resolver';
import { PdfUrlService } from './shared/pdf-url/pdf-url.service';
import { YearListComponent } from './sk-se/year-list/year-list.component';
import { PkbViewerComponent } from './pkb/pkb-viewer/pkb-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    UIModule,
    SearchBarModule
  ],
  declarations: [
    HcmInfoComponent,
    PkbComponent,
    SkViewerComponent,
    SkListComponent,
    YearListComponent,
    PkbViewerComponent,
    PdfViewerComponent
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    HcmInfoService,
    DocumentYearsService,
    DocumentYearsResolve,
    PdfUrlService,
    PdfUrlResolve
  ]
})
export class HcmInfoModule { }
