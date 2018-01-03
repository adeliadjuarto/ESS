import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { PATH } from './../core/constant/index';
import { AppState } from './../app.reducer';
import { DashboardAction } from './shared/dashboard.action';
import { UserAction } from './account/shared/user.action';
import { NotificationService } from './../shared/notification/notification.service';
import { UserService } from './account/shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  menuTitle: string = '';
  updatePromise: Promise<boolean> = window['updateAvailable'] || null;

  constructor(private store: Store<any>,
              private notification: NotificationService,
              private router: Router,
              private route: ActivatedRoute,
              private service: UserService) {

    this.store.dispatch({ type: DashboardAction.INIT });
    this.store.select((state: AppState) => state.dashboardState)
        .subscribe((dashState) => {
          if (dashState) {
            this.menuTitle = dashState.title;
          }
        });
    this.service.fetchCurrent().subscribe(data => {
          console.log(data);
          this.store.dispatch({ type: UserAction.CHANGE_USER, payload: data});
    });
  }

  ngOnInit() {
    if (this.updatePromise) {
      this.updatePromise.then(updateAvailable => {
        if (updateAvailable) {
          this.notification.show('New Content Available. Please refresh.');
        }
      });
    }
  }

  public back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  logout() {
    this.router.navigateByUrl(PATH.LOGOUT);
  }

}
