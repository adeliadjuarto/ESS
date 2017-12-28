import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { AppState } from './../../app.reducer';
import { PATH } from './../../core/constant/index';
import { BACKGROUND } from './../../core/constant';
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

  insuranceTypes: Array<Object> = Array<Object>();
  cities: Array<string> = Array<string>();
  providers: Array<Object> = Array<Object>();

  selectedInsuranceType: number = null;
  selectedCity: string = '';
  selectedProvider: number = null;

  stateCtrl: FormControl;
  filteredCities: Observable<string[]>;
  backgroundPath: string = BACKGROUND.MENU_BOTTOM;

  constructor(private store: Store<any>,
              private router: Router,
              private medicalInfoService: MedicalInfoService,
              private route: ActivatedRoute,
              private notification: NotificationService) {
      this.insuranceTypes = this.route.snapshot.data['insuranceTypes'];
      this.cities = this.route.snapshot.data['providerCities'];
      this.providers = this.route.snapshot.data['providerTypes'];

      this.store.dispatch({
        type: SearchFilterActions.FILTER_INIT,
        payload: this.route.routeConfig.component.name
      });

      this.store.select((obj: AppState) => obj.searchFilterState[this.route.routeConfig.component.name])
          .subscribe((searchFilterState) => {
            if (searchFilterState) {
              this.selectedCity = searchFilterState['city'];
              this.selectedInsuranceType = searchFilterState['insurance-type'];
              this.selectedProvider = searchFilterState['provider-type'];
            }
      });

      this.stateCtrl = new FormControl();
      this.filteredCities = this.stateCtrl.valueChanges
                                .startWith(null)
                                .map(city => city ? this.filterCity(city) : this.cities);
  }

  ngOnInit() {
  }

  filterCity(input) {
    return this.cities.filter( city => city.toLowerCase().indexOf(input.toLowerCase()) === 0 );
  }

  goToDetails() {
    let filter = { city: this.selectedCity, 'provider-type': this.selectedProvider, 'insurance-type': this.selectedInsuranceType };

    this.store.dispatch({
      type: SearchFilterActions.FILTER_UPDATE,
      payload: {
        filters: filter,
        component: this.route.routeConfig.component.name
      }
    });

    if (this.selectedCity) {
      if (!this.cities.includes(this.selectedCity.toUpperCase())) {
        this.notification.show('City Not Found', NotificationType.Error);
        return;
      }
      this.router.navigate([PATH.DETAILS], { relativeTo: this.route,
        queryParams : {city: this.selectedCity, provider: this.selectedProvider, insurance: this.selectedInsuranceType}
      });
    } else {
      this.notification.show('Field \'Kota\' must be filled', NotificationType.Error)
    }

  }

}
