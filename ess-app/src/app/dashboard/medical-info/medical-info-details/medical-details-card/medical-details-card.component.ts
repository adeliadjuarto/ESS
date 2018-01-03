import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Provider, ContactNum } from '../../shared/provider.model';
import { PATH } from './../../../../core/constant/index';

@Component({
  selector: 'app-medical-details-card',
  templateUrl: './medical-details-card.component.html',
  styleUrls: ['./medical-details-card.component.scss']
})
export class MedicalDetailsCardComponent implements OnInit {

  @Input() provider: Provider;
  public telephone: ContactNum[];
  public fax: ContactNum[];

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  redirectToMap(id) {
    this.router.navigate([PATH.MAP, id], { relativeTo: this.route });
  }

}
