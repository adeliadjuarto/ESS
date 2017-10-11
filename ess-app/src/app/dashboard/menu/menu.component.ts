import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map';

import { AuthorizationService } from '../../core/network/authentication/authorization.service';
import { MenuItem, PATH } from './../../core/constant/index';
import { NotificationType } from '../../shared/notification/notification.enum';
import { NotificationService } from '../../shared/notification/notification.service';
import { BACKGROUND } from './../../core/constant';
import { DashboardAction } from './../shared/dashboard.action';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menus: Array<MenuItem> = Array<MenuItem>();
  public menuInfo: boolean = false;
  public infoIcon: boolean = true;
  public onlineToggle: boolean;

  @ViewChild('menuContainer') private container: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<any>,
              private authorization: AuthorizationService,
              private notification: NotificationService) {

    // this.menus = this.authorization.authorizedMenus(this.route.parent.routeConfig.children)
    //   .filter((menu: MenuItem) => menu.path !== PATH.ACCOUNT);

    this.store.dispatch({ type: DashboardAction.CHANGE_TITLE, payload: '' });

    this.menus = this.route.parent.routeConfig.children
                     .filter((r: Route) => r.data )
                     .map((r: Route) => {
                            return { path: r.path,
                                    title: r.data.title,
                                    disabledWhenOffline: r.data.disabledWhenOffline,
                                    description: r.data.description,
                                    iconPath: r.data.iconPath }; })
                     .filter((menu: MenuItem) => menu.path !== PATH.ACCOUNT);

    Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false))
    .subscribe((online) => this.onlineToggle = online);
  }

  ngOnInit() { }

  redirectTo(menu) {
    if (menu.disabledWhenOffline && this.onlineToggle === false) {
      let message = 'Akses Internet Dibutuhkan';
      let type = NotificationType.Error;
      this.notification.show(message, type);
    } else {
      this.router.navigate([menu.path], { relativeTo: this.route });
    }
  }

  toggleMenuInfo() {
    this.menuInfo = !this.menuInfo;
    this.infoIcon = !this.infoIcon;
  }

  public get columns(): number {
    return Math.ceil(this.container.nativeElement.offsetWidth / 300);
  }

  public menuDisabled(menu): string {
    if (!this.onlineToggle && menu.disabledWhenOffline) {
      return 'disabled';
    }
    return 'clickable';
  }

  @HostListener('window:resize')
  onResize() {
    this.columns;
  }

}
