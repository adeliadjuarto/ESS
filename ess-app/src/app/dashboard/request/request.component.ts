import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { Store } from '@ngrx/store';

import { MenuItem, PATH } from './../../core/constant/index';
import { DashboardAction } from './../shared/dashboard.action';
import { MenuComponent } from './../menu/menu.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  menus;

  @ViewChild('requestContainer') private container: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>) {
    this.store.dispatch({
      type: DashboardAction.CHANGE_TITLE,
      payload: 'Pengajuan Request'
    })

    this.menus = this.route.parent.routeConfig.children
                 .filter((r: Route) => r.data )
                 .map((r: Route) => {
                        return { path: r.path,
                                title: r.data.title,
                                disabledWhenOffline: r.data.disabledWhenOffline,
                                description: r.data.description,
                                iconPath: r.data.iconPath }; })
                 .filter((menu: MenuItem) => menu.path !== PATH.ACCOUNT);
  }

  ngOnInit() {
  }

  redirectTo(menu) {
    this.router.navigate([menu.path], { relativeTo: this.route });
  }

  public get columns(): number {
    return Math.ceil(this.container.nativeElement.offsetWidth / 300);
  }

  @HostListener('window:resize')
  onResize() {
    this.columns;
  }

}
