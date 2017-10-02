import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { DEFAULTS } from '../../core/constant/index';
import { NotificationType } from './notification.enum';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() public type: string = NotificationType.Default;
  @Input() public timeout: number = DEFAULTS.TOAST_TIMEOUT;
  @Output() public close: EventEmitter<any> = new EventEmitter<any>();

  public state: string = '';
  public display: boolean = true;

  constructor() { }

  ngOnInit() {
    if (this.display) {
      setTimeout(() => {
        this.state = 'transition-in';
      }, 5);
    }
  }

  ngOnDestroy() {
    this.display = false;
  }

  ngAfterViewInit() {
    if (this.timeout > 0) {
      setTimeout(() => {
        if (this.display) {
          this.state = 'transition-out';
          this.dismiss();
        }
      }, this.timeout);
    }
  }

  private dismiss() {
    if (this.display) {
      setTimeout(() => {
        this.display = false;
        this.close.emit(null);
      }, 150);
    }
  }

}
