import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';

import { ApiService } from './api.service';
import { AuthenticatedHttpService } from './authentication/authenticated-http.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthorizationService } from './authentication/authorization.service';
import { AuthenticatedGuard } from './authentication/shared/authenticated.guard';
import { AuthorizedGuard } from './authentication/shared/authorized.guard';
import { NotAuthenticatedGuard } from './authentication/shared/not-authenticated.guard';
import { TokenService } from './authentication/token/token.service';
import { NetworkService } from './network.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    NetworkService,
    ApiService,
    TokenService,
    AuthenticationService,
    AuthorizationService,
    AuthenticatedGuard,
    AuthorizedGuard,
    NotAuthenticatedGuard,
    { provide: Http, useClass: AuthenticatedHttpService }
  ]
})
export class NetworkModule { }
