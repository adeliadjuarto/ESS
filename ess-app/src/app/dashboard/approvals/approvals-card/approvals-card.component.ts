import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../../app.reducer';
import { Approvals } from '../shared/approvals.model';
import { DEFAULTS } from './../../../core/constant';

@Component({
  selector: 'app-approvals-card',
  templateUrl: './approvals-card.component.html',
  styleUrls: ['./approvals-card.component.scss']
})
export class ApprovalsCardComponent<T extends Approvals> implements OnInit {

  @Input() inputStatus: T;
  @Input() approvalType: string;

  constructor() { }

  ngOnInit() {
  }

}
