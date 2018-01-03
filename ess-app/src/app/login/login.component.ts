import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PATH, ENDPOINT, BACKGROUND } from '../core/constant/index';
import { Credential } from './../core/network/shared/model/credential.model';
import { NotificationType } from '../shared/notification/notification.enum';
import { NotificationService } from '../shared/notification/notification.service';
import { LoginService } from './shared/login.service';
import { LoginState } from './shared/login.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;
  public credential: Credential = { identifier: null, secret: null };

  constructor(private service: LoginService,
              private router: Router,
              private notification: NotificationService) {
    this.service.initialize();
  }

  ngOnInit() {
    this.service.observable
      .subscribe((state: LoginState) => {
        this.isLoading = state.loading;

        if (state.message) { this.notification.show(state.message, state.success ? NotificationType.Default : NotificationType.Error); }
        if (state.success) {
          this.router.navigateByUrl(PATH.DASHBOARD);
        }
      });
  }

  handleSubmit() {
    this.service.login(this.credential);
  }

}
