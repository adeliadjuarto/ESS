import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { MenuItem, PATH } from './../../core/constant/index';
import { BACKGROUND } from './../../core/constant';

@Component({
  selector: 'app-hcm-info',
  templateUrl: './hcm-info.component.html',
  styleUrls: ['./hcm-info.component.scss']
})
export class HcmInfoComponent implements OnInit {

  public menuItems: Array<MenuItem> = Array<MenuItem>();
  @ViewChild('myGuideContainer') private container: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.menuItems = this.route.parent.routeConfig.children
      .filter((r: Route) => r.path !== '')
      .map((r: Route) => { return { title: r.data.title, path: r.path }; });
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
