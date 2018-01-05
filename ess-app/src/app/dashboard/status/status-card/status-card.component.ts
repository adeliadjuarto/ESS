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
  iconStatus: string;

  constructor() { }

  ngOnInit() {
  }

  public get status(): string {
    if (this.inputStatus.isApproved === null) {
      this.iconStatus = 'watch_later';
      return 'pending';
    } else if (this.inputStatus.isApproved) {
      this.iconStatus = 'done';
      return 'approved';
    } else if (this.inputStatus.isApproved === false) {
      this.iconStatus = 'clear';
      return 'rejected';
    }

    return '';
  }

}
