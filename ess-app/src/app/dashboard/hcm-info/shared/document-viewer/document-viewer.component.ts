import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../../../shared/dashboard.action';
import { AppState } from '../../../../app.reducer';
import { HcmInfoService } from '../../shared/hcm-info.service';
import { DocumentsAction as Action } from '../../shared/hcm-info.action';
import { Document } from './../../shared/document.model';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {

  url: string;

  constructor(private route: ActivatedRoute,
              private store: Store<any>) {
    let title = this.route.snapshot.data['title'];
    let url = this.route.snapshot.params['id'];
    this.url = url;
    this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: title});
  }

  ngOnInit() {
  }
}
