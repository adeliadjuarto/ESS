import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, Route } from '@angular/router';

import { Store } from '@ngrx/store';
import { map } from 'lodash';

import { AppState } from './../../app.reducer';
import { DashboardAction } from './../shared/dashboard.action';
import { ApprovalsTypes } from './shared/approvals-types.enum';
import { ApprovalsService } from './shared/approvals.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit, AfterContentInit {

  approvalTypes = map(ApprovalsTypes, 'title');
  approvalTypeUrl: string = ApprovalsTypes.Leave.url;
  userId: string;

  isLoading: boolean = false;

  approvals = [];

  constructor(private service: ApprovalsService,
              private store: Store<any>,
              private router: Router) {
    this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Penyetujuan Transaksi'});
    this.store.select((obj: AppState) => obj.approvalsState)
              .subscribe((approvalsState) => {
                if (approvalsState) {
                  this.approvals = approvalsState.approvalItems;
                  this.isLoading = approvalsState.loading;
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
    this.fetchApprovalStatus(ApprovalsTypes.Leave.url);
  }

  ngAfterContentInit() {
    window.scrollTo(0, 0);
  }

  updateTab($event: any) {
    let statusType: string = $event.tab.textLabel;
    switch (statusType) {
      case ApprovalsTypes.Leave.title:
        return this.fetchApprovalStatus(ApprovalsTypes.Leave.url);
      case ApprovalsTypes.Overtime.title:
        return this.fetchApprovalStatus(ApprovalsTypes.Overtime.url);
      case ApprovalsTypes.Reimbursement.title:
        return this.fetchApprovalStatus(ApprovalsTypes.Reimbursement.url);
      default:
        break;
    }
  }

  fetchApprovalStatus(typeEndpoint) {
    this.approvalTypeUrl = typeEndpoint;
    this.service.fetchApprovals(typeEndpoint);
  }

  public get isEmpty(): boolean {
    return this.approvals.length === 0;
  }
}
