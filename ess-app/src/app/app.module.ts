import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { InjectionService } from './core/utilities/injection.service';
import { NetworkModule } from './core/network/network.module';
import { StorageModule } from './core/storage/storage.module';
import { reducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    MaterialModule,
    NetworkModule,
    StorageModule,
    StoreModule.provideStore(reducer)
  ],
  providers: [
    InjectionService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
