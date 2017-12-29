import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../../../shared/dashboard.action';

@Component({
  selector: 'app-sk-viewer',
  templateUrl: './sk-viewer.component.html',
  styleUrls: ['./sk-viewer.component.scss']
})
export class SkViewerComponent implements OnInit {

  url: string;

  constructor(private route: ActivatedRoute,
              private store: Store<any>) {
    this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'SK / SE'});
    let  { url } = this.route.snapshot.data;
    this.url = url;
  }

  ngOnInit() {
  }

}
