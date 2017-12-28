import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SearchBarModule } from './../../shared/search-bar/search-bar.module';
import { ContactsComponent } from './contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactsService } from './shared/contacts.service';
import { UIModule } from './../../shared/user-interface.module';
import { ContactsResolve } from './shared/contacts.resolver';
import { ContactsFilterModule } from './shared/contacts-filter/contacts-filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    SearchBarModule,
    InfiniteScrollModule,
    ContactsFilterModule
  ],
  declarations: [
    ContactsComponent,
    ContactDetailComponent,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ContactsService,
    ContactsResolve
  ]
})
export class ContactsModule {
}
