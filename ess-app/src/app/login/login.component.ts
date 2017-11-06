import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PATH, ENDPOINT, BACKGROUND } from '../core/constant/index';
import { LoginService } from './shared/login.service';
import { LoginState } from './shared/login.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private destroyed: boolean = false;
  public isLoading: boolean = false;

  constructor(private service: LoginService,
              private router: Router) {
    this.service.initialize();
  }

  ngOnInit() {
    this.service.observable
      .takeWhile(() => !this.destroyed)
      .subscribe((state: LoginState) => {
        this.isLoading = state.loading;

        if (state.success) {
          this.router.navigateByUrl(PATH.DASHBOARD);
        }
      });
  }

  login() {
    this.service.login();
  }

}
