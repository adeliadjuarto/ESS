import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../../app.reducer';
import { Approvals } from '../shared/approvals.model';
import { DEFAULTS } from './../../../core/constant';
import { ApprovalsService } from './../shared/approvals.service';
import { NotificationService } from './../../../shared/notification/notification.service';
import { NotificationType } from './../../../shared/notification/notification.enum';

@Component({
  selector: 'app-approvals-card',
  templateUrl: './approvals-card.component.html',
  styleUrls: ['./approvals-card.component.scss']
})
export class ApprovalsCardComponent<T extends Approvals> implements OnInit {

  @Input() inputStatus: T;
  @Input() approvalType: string = '';
  approvalSubmission: string;
  rejectionNote: string = '';

  constructor(private service: ApprovalsService,
              private notification: NotificationService) { }

  ngOnInit() {
  }

  submitApproval(type) {
    this.approvalSubmission = type;
  }

  approveRequest() {
    let endpoint = `${this.approvalType}/${this.inputStatus.id}/${this.approvalSubmission}`;
    if (this.approvalSubmission === 'reject' && !this.rejectionNote) {
      this.notification.show('Keterangan harus diisi', NotificationType.Error);
      return;
    }
    if (this.rejectionNote) {
      this.service.approveRequest(endpoint, this.rejectionNote)
                  .subscribe(response => {
                    this.notification.show(response);
                    this.service.fetchApprovals(this.approvalType)
                  });
    } else {
      this.service.approveRequest(endpoint)
                  .subscribe(response => {
                    this.notification.show(response);
                    this.service.fetchApprovals(this.approvalType)
                  });
    }
  }

}
