import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from '../../../../app.reducer';
import { DashboardAction } from './../../../shared/dashboard.action';
import { HcmInfoService } from '../../shared/hcm-info.service';
import { DocumentsAction as Action } from '../../shared/hcm-info.action';
import { Document } from '../../shared/document.model';

@Component({
  selector: 'app-year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {

  listOfYears: String[];

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute) {

              this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'SK / SE'});
              this.store.select((appState: AppState) => appState.hcmInfoState)
                        .subscribe((hcmInfoState) => {
                          if (hcmInfoState) {
                            this.listOfYears = hcmInfoState.yearList.sort().reverse();
                          }
              });
  }

  ngOnInit() {
    let yearList = this.route.snapshot.data['documentYears'];
    this.store.dispatch({
      type: Action.UPDATE_YEARLIST,
      payload: yearList
    });
  }

  loadListOfSK(year) {
    this.router.navigate([year], { relativeTo: this.route });
  }

  public get isEmpty(): boolean {
    return this.listOfYears.length === 0;
  }

}
