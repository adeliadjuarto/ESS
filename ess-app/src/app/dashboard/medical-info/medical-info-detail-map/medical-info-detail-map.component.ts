import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../../shared/dashboard.action';

@Component({
  selector: 'app-medical-info-detail-map',
  templateUrl: './medical-info-detail-map.component.html',
  styleUrls: ['./medical-info-detail-map.component.scss']
})
export class MedicalInfoDetailMapComponent implements OnInit {
  @ViewChild('googleMaps') private viewer: ElementRef;

  googleMapsUrl: SafeResourceUrl;
  constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer, private store: Store<any>) {
    let { provider } = this.route.snapshot.data;
    this.googleMapsUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${provider.address}&output=embed`);
        this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Peta Lokasi'});
  }

  ngOnInit() {
  }

}
