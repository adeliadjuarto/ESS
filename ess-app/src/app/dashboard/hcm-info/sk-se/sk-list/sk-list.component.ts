import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from '../../../../app.reducer';
import { HcmInfoService } from '../../shared/hcm-info.service';
import { Document } from './../../shared/document.model';
import { DocumentsAction as Action } from '../../shared/hcm-info.action';
import { SearchBarXsComponent } from './../../../../shared/search-bar/search-bar-xs/search-bar-xs.component';
import { DocumentsAction as Actions } from './../../shared/hcm-info.action';
import { DOCUMENT } from './../../../../core/constant/index';

@Component({
  selector: 'app-sk-list',
  templateUrl: './sk-list.component.html',
  styleUrls: ['./sk-list.component.scss']
})
export class SkListComponent implements OnInit, AfterViewInit {

  @ViewChild(SearchBarXsComponent) searchBarXsComponent: SearchBarXsComponent;

  listOfSK: Document[];
  filteredSK: Document[];

  constructor(private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private hcmInfoService: HcmInfoService) {

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
    this.searchBarXsComponent.setFocus();
  }

  ngAfterViewInit() {
    this.searchBarXsComponent.query$
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
