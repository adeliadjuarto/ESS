import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../../shared/dashboard.action';
import { Provider } from '../shared/provider.model';
import { MedicalInfoService } from '../shared/medical-info.service';
import { AppState } from '../../../app.reducer';

@Component({
  selector: 'app-medical-info-details',
  templateUrl: './medical-info-details.component.html',
  styleUrls: [ './medical-info-details.component.css' ]
})
export class MedicalInfoDetailsComponent implements OnInit {

  providers: Provider[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute,
    private medicalInfoService: MedicalInfoService, private store: Store<any>) {
    this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Provider Tunjangan Medis'});
    this.store.select((obj: AppState) => obj.medicalInfoState)
      .subscribe((medicalInfoState) => {
        if (medicalInfoState) {
          this.isLoading = medicalInfoState.loading;
          this.providers = medicalInfoState.providers;
        }
    });
    route.queryParams.subscribe((params: Params) => {
      let filter = { city: params['city'], 'provider-type': params['provider'], 'insurance-type': params['insurance'] };
      this.medicalInfoService.fetchProviders(filter);
    });
  }

  ngOnInit() {
  }

  public get isEmpty(): boolean {
    return this.providers.length === 0;
  }
}
