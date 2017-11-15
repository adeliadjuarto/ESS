import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from './../app.reducer';
import { DashboardAction } from './shared/dashboard.action';
import { UserAction } from './account/shared/user.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  menuTitle: string = '';

  constructor(private store: Store<any>) {

    this.store.dispatch({ type: DashboardAction.INIT });
    this.store.dispatch({ type: UserAction.CHANGE_USER, payload: '1'});

    this.store.select((state: AppState) => state.dashboardState)
        .subscribe((dashState) => {
          if (dashState) {
            this.menuTitle = dashState.title;
          }
        })
  }

  ngOnInit() {
  }

}
