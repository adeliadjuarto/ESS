import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../../app.reducer';
import { Status } from '../shared/status.model';
import { DEFAULTS } from './../../../core/constant';


@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent<T extends Status> implements OnInit {

  @Input() inputStatus: T;
  @Input() approvalType: string;
  statusHistory: Array<any> = Array<any>();

  constructor() { }

  ngOnInit() {
  }

  public get status(): string {

    if (this.inputStatus.isApproved === null) {
      return 'Pending';
    } else if (this.inputStatus.isApproved) {
      return 'Approved';
    } else if (this.inputStatus.isApproved === false) {
      return 'Rejected';
    }

    return '';
  }

}
