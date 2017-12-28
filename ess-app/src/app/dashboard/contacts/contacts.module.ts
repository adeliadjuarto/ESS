import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SearchBarModule } from './../../shared/search-bar/search-bar.module';
import { ContactsComponent } from './contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactsService } from './shared/contacts.service';
import { UIModule } from './../../shared/user-interface.module';
import { ContactsResolve } from './shared/contacts.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    SearchBarModule,
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
