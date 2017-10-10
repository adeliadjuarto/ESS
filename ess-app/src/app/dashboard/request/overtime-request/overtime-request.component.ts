import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { RequestService } from './../shared/request.service';
import { DashboardAction } from './../../shared/dashboard.action';
import { FormRequest } from './../shared/request.interface';

@Component({
  selector: 'app-overtime-request',
  templateUrl: './overtime-request.component.html',
  styleUrls: ['./overtime-request.component.scss']
})
export class OvertimeRequestComponent implements OnInit {

  fileInput: FormData = new FormData();

  constructor(private store: Store<any>,
              private requestService: RequestService) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Overtime'
    })
  }

  ngOnInit() {
  }

  doSomething() {
    this.requestService.create(this.fileInput).subscribe((data) => console.log(data));
  }

  fileEvent(event) {
    this.fileInput.append('attachments', event.target.files[0]);
  }

}
