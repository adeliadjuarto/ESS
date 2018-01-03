import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, Route } from '@angular/router';

import { Store } from '@ngrx/store';
import { map } from 'lodash';

import { AppState } from './../../app.reducer';
import { DashboardAction } from './../shared/dashboard.action';
import { StatusTypes } from './shared/status-types.enum';
import { StatusService } from './shared/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, AfterContentInit {

  approvalTypes = map(StatusTypes, 'title');
  approvalTypeUrl: string = StatusTypes.Leave.url;
  userId: string;

  isLoading: boolean = false;

  approvals = [];

  constructor(private statusService: StatusService,
              private store: Store<any>,
              private router: Router) {
    this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Status Pengajuan Transaksi'});
    this.store.select((obj: AppState) => obj.statusState)
              .subscribe((statusState) => {
                if (statusState) {
                  this.approvals = statusState.approvalItems;
                  this.isLoading = statusState.loading;
                }
              });
    this.store.select((obj: AppState) => obj.userState)
              .subscribe((userState) => {
                if (userState) {
                  this.userId = userState.user.id;
                }
              })
  }

  ngOnInit() {
    this.fetchApprovalStatus(StatusTypes.Leave.url);
  }

  ngAfterContentInit() {
    window.scrollTo(0, 0);
  }

  updateTab($event: any) {
    let statusType: string = $event.tab.textLabel;
    switch (statusType) {
      case StatusTypes.Leave.title:
        return this.fetchApprovalStatus(StatusTypes.Leave.url);
      case StatusTypes.Overtime.title:
        return this.fetchApprovalStatus(StatusTypes.Overtime.url);
      case StatusTypes.Reimbursement.title:
        return this.fetchApprovalStatus(StatusTypes.Reimbursement.url);
      default:
        break;
    }
  }

  fetchApprovalStatus(typeEndpoint) {
    this.approvalTypeUrl = typeEndpoint;
    this.statusService.fetchApprovals(typeEndpoint);
  }

  public get isEmpty(): boolean {
    return this.approvals.length === 0;
  }

}
