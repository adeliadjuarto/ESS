import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PATH } from '../../../core/constant/index';
import { LoginService } from '../../../login/shared/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private service: LoginService,
              private router: Router) { }

  ngOnInit() { }

  public logout() {
    this.service.logout();
    this.router.navigateByUrl(PATH.LOGIN);
  }

}
