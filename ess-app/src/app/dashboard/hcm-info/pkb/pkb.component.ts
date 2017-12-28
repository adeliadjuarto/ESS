import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from '../../../app.reducer';
import { HcmInfoService } from '../shared/hcm-info.service';
import { DocumentsAction as Actions } from '../shared/hcm-info.action';
import { DOCUMENT } from './../../../core/constant';

@Component({
  selector: 'app-pkb',
  templateUrl: './pkb.component.html',
  styleUrls: ['./pkb.component.scss']
})
export class PkbComponent implements OnInit {

  pkbList = null;

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private hcmInfoService: HcmInfoService) {
    let year = this.route.snapshot.data['documentYears'].sort().reverse()[0];
    this.store.dispatch({ type: Actions.RESET });
    let filter: any = { category: DOCUMENT.PKB, year: year };
    this.hcmInfoService.fetchAllDocuments(filter);

    this.store.select((appState: AppState) => appState.hcmInfoState)
              .subscribe((hcmInfoState) => {
                if (hcmInfoState.documents.length > 0) {
                  this.pkbList = hcmInfoState.documents
                                             .sort((a, b) => {
                                               return (a.id > b.id) ? 1 : -1;
                                             });
        }
    });
  }

  ngOnInit() {
  }

  redirectToPkbViewer(pkb) {
    this.router.navigate([pkb.id], { relativeTo: this.route });
  }

  public get isEmpty(): boolean {
    return this.pkbList === null || this.pkbList === [];
  }

}
