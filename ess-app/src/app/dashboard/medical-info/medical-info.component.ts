import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { AppState } from './../../app.reducer';
import { DashboardAction } from './../shared/dashboard.action';
import { PATH } from './../../core/constant/index';
import { MedicalInfoService } from './shared/medical-info.service';
import { NotificationType } from './../../shared/notification/notification.enum';
import { NotificationService } from './../../shared/notification/notification.service';
import { SearchFilterActions } from './../../shared/search-filter/search-filter.action';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.scss']
})
export class MedicalInfoComponent implements OnInit {

  filters = {
    insuranceTypes: [],
    cities: [],
    providers: []
  }

  selectedFilters = {
    insuranceType: null,
    city: '',
    provider: null
  }

  stateCtrl: FormControl;
  filteredCities: Observable<string[]>;

  constructor(private store: Store<any>,
              private router: Router,
              private medicalInfoService: MedicalInfoService,
              private route: ActivatedRoute,
              private notification: NotificationService) {
      this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Penyedia Tunjangan Medis'});
      this.filters.insuranceTypes = this.route.snapshot.data['insuranceTypes'];
      this.filters.cities = this.route.snapshot.data['providerCities'];
      this.filters.providers = this.route.snapshot.data['providerTypes'];

      this.store.dispatch({
        type: SearchFilterActions.FILTER_INIT,
        payload: this.route.routeConfig.component.name
      });

      this.store.select((obj: AppState) => obj.searchFilterState[this.route.routeConfig.component.name])
          .subscribe((searchFilterState) => {
            if (searchFilterState) {
              this.selectedFilters.city = searchFilterState['city'];
              this.selectedFilters.insuranceType = searchFilterState['insurance-type'];
              this.selectedFilters.provider = searchFilterState['provider-type'];
            }
      });

      this.stateCtrl = new FormControl();
      this.filteredCities = this.stateCtrl.valueChanges
                                .startWith(null)
                                .map(city => city ? this.filterCity(city) : this.filters.cities);
  }

  ngOnInit() {
  }

  filterCity(input) {
    return this.filters.cities.filter( city => city.toLowerCase().indexOf(input.toLowerCase()) === 0 );
  }

  goToDetails() {
    let filter = { city: this.selectedFilters.city, 'provider-type': this.selectedFilters.provider, 'insurance-type': this.selectedFilters.insuranceType };

    this.store.dispatch({
      type: SearchFilterActions.FILTER_UPDATE,
      payload: {
        filters: filter,
        component: this.route.routeConfig.component.name
      }
    });

    if (this.selectedFilters.city) {
      if (!this.filters.cities.includes(this.selectedFilters.city.toUpperCase())) {
        this.notification.show('City Not Found', NotificationType.Error);
        return;
      }
      this.router.navigate([PATH.DETAILS], { relativeTo: this.route,
        queryParams : {city: this.selectedFilters.city, provider: this.selectedFilters.provider, insurance: this.selectedFilters.insuranceType}
      });
    } else {
      this.notification.show('Field \'Kota\' harus diisi', NotificationType.Error)
    }

  }

}
