import { Component, OnInit } from '@angular/core';

import { mapKeys } from 'lodash';
import { Store } from '@ngrx/store';

import { AppState } from './../../../app.reducer';
import { Request } from './../shared/request';
import { REIMBURSEMENT_TYPES, ENDPOINT } from './../../../core/constant';
import { DashboardAction } from './../../shared/dashboard.action';
import { ReimbursementRequestService } from './shared/reimbursement-request.service';
import { Reimbursement } from './../shared/request.interface';
import { NotificationService } from './../../../shared/notification/notification.service';
import { NotificationType } from './../../../shared/notification/notification.enum';

declare var idbKeyval;
const key = 'pwa-sync';

@Component({
  selector: 'app-reimbursement-request',
  templateUrl: './reimbursement-request.component.html',
  styleUrls: ['./reimbursement-request.component.scss']
})
export class ReimbursementRequestComponent extends Request implements OnInit {

  types = REIMBURSEMENT_TYPES;
  selectedType: any;

  request = {
    title: '',
    description: '',
    date: null,
    amount: null,
    attachments: null,
  }

  userId: string;
  requestConfirm: boolean = false;
  errorMessage: string;

  pendingRequests: number = 0;
  fileName: string = '';

  constructor(private store: Store<any>,
              private requestService: ReimbursementRequestService,
              private notification: NotificationService) {
    super();
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Pengajuan Reimbursement'
    });
    this.store.select((state: AppState) => state.userState).subscribe((state) => {
      this.userId = state.user.id;
    });
    this.getPendingMessages();
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.request.attachments = event.target.files[0];
    this.fileName = this.request.attachments.name;
  }

  confirmRequest() {
    if (this.requestValid()) {
      this.requestConfirm = !this.requestConfirm;
    } else {
      this.notification.show(this.errorMessage, NotificationType.Error);
    }
  }

  submitRequest() {
    let eventDate = this.request.date.getTime();

    let formRequest: Reimbursement = {
        title: this.request.title,
        description: this.request.description,
        eventDate: eventDate,
        amount: this.request.amount,
        requestTypeId: this.selectedType.id,
        'attachments[]': this.request.attachments
    };

    this.requestService.createRequest(formRequest);
    this.resetForm();
    this.getPendingMessages();
  }

  dateDisplay(date: Date) {
    let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', dateOptions);
  }

  currencyDisplay(amountString: string) {
    let amount = parseInt(amountString, 10);
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }

  requestValid() {
    if (!this.request.title || !this.request.description) {
      this.errorMessage = 'Semua input harus diisi';
      return false;
    }

    if (this.request.date.getTime() > Date.now()) {
      this.errorMessage = 'Tanggal melebihi tanggal hari ini'
      return false;
    }

    return true;
  }

  resetForm() {
    this.requestConfirm = false;
    this.request = {
      title: '',
      description: '',
      date: null,
      amount: null,
      attachments: null,
    }
    this.selectedType = null;
  }

  getPendingMessages() {
    idbKeyval.get(key)
         .then((pendingReqs: any[]) => {
           if (pendingReqs) {
            this.pendingRequests = pendingReqs.filter(data => data.url.includes(ENDPOINT.REQUEST.REIMBURSEMENT)).length;
           }
         });
  }

}
