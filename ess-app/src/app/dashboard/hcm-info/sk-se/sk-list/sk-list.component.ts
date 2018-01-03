import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../../../shared/dashboard.action';
import { AppState } from '../../../../app.reducer';
import { HcmInfoService } from '../../shared/hcm-info.service';
import { Document } from './../../shared/document.model';
import { DocumentsAction as Action } from '../../shared/hcm-info.action';
import { SearchBarComponent } from './../../../../shared/search-bar/search-bar.component';
import { DocumentsAction as Actions } from './../../shared/hcm-info.action';
import { DOCUMENT } from './../../../../core/constant/index';

@Component({
  selector: 'app-sk-list',
  templateUrl: './sk-list.component.html',
  styleUrls: ['./sk-list.component.scss']
})
export class SkListComponent implements OnInit, AfterViewInit {

  @ViewChild(SearchBarComponent) searchBarComponent: SearchBarComponent;

  listOfSK: Document[];
  filteredSK: Document[];

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private hcmInfoService: HcmInfoService) {

              this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'SK / SE'});

              this.store.select((appState: AppState) => appState.hcmInfoState)
                        .subscribe((hcmInfoState) => {
                          if (hcmInfoState) {
                            this.listOfSK = hcmInfoState.documents;
                            this.filterDocuments('');
                          }
              });
  }

  ngOnInit() {
    let year = this.route.snapshot.params['year'];
    this.loadListOfSK(year);
    this.searchBarComponent.setFocus();
  }

  ngAfterViewInit() {
    this.searchBarComponent.query$
          .subscribe((query) => {
            this.filterDocuments(query);
      });
  }

  redirectToSkViewer(sk) {
    this.router.navigate([sk.id], { relativeTo: this.route });
  }

  loadListOfSK(year) {
    this.store.dispatch({ type: Actions.RESET });
    let filter = { category: DOCUMENT.SK, year: year };
    this.hcmInfoService.fetchAllDocuments(filter);
  }

  filterDocuments(query: string) {
    this.filteredSK = this.listOfSK.filter(sk => sk.title.toLowerCase()
                                                       .includes(query.toLowerCase()));
  }

  public get isEmpty(): boolean {
    return this.filteredSK.length === 0;
  }

}
