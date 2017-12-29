import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../../../shared/dashboard.action';
import { AppState } from '../../../../app.reducer';
import { HcmInfoService } from '../../shared/hcm-info.service';
import { DocumentsAction as Action } from '../../shared/hcm-info.action';
import { SearchBarXsComponent } from './../../../../shared/search-bar/search-bar-xs/search-bar-xs.component';
import { Document } from './../../shared/document.model';

@Component({
  selector: 'app-pkb-viewer',
  templateUrl: './pkb-viewer.component.html',
  styleUrls: ['./pkb-viewer.component.scss']
})
export class PkbViewerComponent implements OnInit {

  url: string;

  constructor(private route: ActivatedRoute,
              private store: Store<any>) {
    let  { url } = this.route.snapshot.data;
    this.url = url;
    this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'PKB'});
  }

  ngOnInit() {
  }

}
