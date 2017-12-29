import { Component, OnInit } from '@angular/core';

import { mapKeys } from 'lodash';
import { Store } from '@ngrx/store';

import { AppState } from './../../../app.reducer';
import { REIMBURSEMENT_TYPES } from './../../../core/constant';
import { DashboardAction } from './../../shared/dashboard.action';
import { ReimbursementRequestService } from './shared/reimbursement-request.service';
import { Reimbursement } from './../shared/request.interface';
import { NotificationService } from './../../../shared/notification/notification.service';
import { NotificationType } from './../../../shared/notification/notification.enum';

@Component({
  selector: 'app-reimbursement-request',
  templateUrl: './reimbursement-request.component.html',
  styleUrls: ['./reimbursement-request.component.scss']
})
export class ReimbursementRequestComponent implements OnInit {

  types = REIMBURSEMENT_TYPES;

  selectedType: any;
  title: string;
  description: string;
  eventDate: Date;
  amount: number;
  requestTypeId: number;
  userId: string;
  requestAttachments: File[];

  requestConfirm: boolean = false;
  errorMessage: string;

  constructor(private store: Store<any>,
              private requestService: ReimbursementRequestService,
              private notification: NotificationService) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Reimbursement'
    });
    this.store.select((state: AppState) => state.userState).subscribe((state) => {
      this.userId = state.id;
    });
  }

  ngOnInit() {
  }

  fileChange(event) {
    this.requestAttachments = event.target.files[0];
  }

  confirmRequest() {
    if (this.requestValid()) {
      this.requestConfirm = !this.requestConfirm;
    } else {
      this.notification.show(this.errorMessage, NotificationType.Error);
    }
  }

  submitRequest() {
    let eventDate = this.eventDate.getTime();

    let formRequest: Reimbursement = {
        title: this.title,
        description: this.description,
        eventDate: eventDate,
        amount: this.amount,
        requestTypeId: this.selectedType.id,
        'attachments[]': this.requestAttachments
    };

    this.requestService.createRequest(formRequest);
    this.resetForm();
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
    if (!this.title || !this.description) {
      this.errorMessage = 'Semua input harus diisi';
      return false;
    }

    if (this.eventDate.getTime() > Date.now()) {
      this.errorMessage = 'Tanggal melebihi tanggal hari ini'
      return false;
    }

    if (!this.requestAttachments) {
      this.errorMessage = 'File bukti belum diupload';
      return false;
    }

    return true;
  }

  resetForm() {
    this.requestConfirm = false;
    this.eventDate = null;
    this.requestAttachments = [];
    this.title = '';
    this.description = '';
    this.amount = null;
    this.selectedType = null;
  }

}
