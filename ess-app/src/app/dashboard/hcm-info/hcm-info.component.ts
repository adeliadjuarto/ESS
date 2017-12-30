import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { Store } from '@ngrx/store';

import { DashboardAction } from './../shared/dashboard.action';
import { MenuItem, PATH } from './../../core/constant/index';

@Component({
  selector: 'app-hcm-info',
  templateUrl: './hcm-info.component.html',
  styleUrls: ['./hcm-info.component.scss']
})
export class HcmInfoComponent implements OnInit {

  public menuItems: Array<MenuItem> = Array<MenuItem>();
  @ViewChild('myGuideContainer') private container: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<any>) {
    this.store.dispatch({type: DashboardAction.CHANGE_TITLE, payload: 'Informasi HCM'});
    this.menuItems = this.route.parent.routeConfig.children
      .filter((r: Route) => r.path !== '')
      .map((r: Route) => { return { title: r.data.title, path: r.path, icon: r.data.icon }; });
  }

  ngOnInit() {
  }

  redirectTo(path) {
    this.router.navigate([path], { relativeTo: this.route });
  }

  public get columns(): number {
    return Math.ceil(this.container.nativeElement.offsetWidth / 300);
  }

  @HostListener('window:resize')
  onResize() {
    this.columns;
  }

}
