import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../shared/dashboard.action';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Chat'
    })
  }

  ngOnInit() {
  }

}
