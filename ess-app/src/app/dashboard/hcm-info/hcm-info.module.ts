import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchBarModule } from './../../shared/search-bar/search-bar.module';
import { UIModule } from './../../shared/user-interface.module';
import { HcmInfoComponent } from './hcm-info.component';
import { PkbComponent } from './pkb/pkb.component';
import { SkListComponent } from './sk-se/sk-list/sk-list.component';
import { HcmInfoService } from './shared/hcm-info.service';
import { DocumentYearsService } from './shared/document-years/document-years.service';
import { DocumentYearsResolve } from './shared/document-years/document-years.resolver';
import { YearListComponent } from './sk-se/year-list/year-list.component';
import { DocumentViewerComponent } from './shared/document-viewer/document-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    UIModule,
  ],
  declarations: [
    HcmInfoComponent,
    PkbComponent,
    SkListComponent,
    YearListComponent,
    DocumentViewerComponent,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    HcmInfoService,
    DocumentYearsService,
    DocumentYearsResolve,
  ]
})
export class HcmInfoModule { }
