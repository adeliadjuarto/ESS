import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() icon: string;
  @Input() content: string;
  @Input() extension: string = '';
  @Input() actionIcon: string;
  @Output() action: EventEmitter<void> = new EventEmitter<void>();

  contentDisplay: string;

  constructor() { }

  ngOnInit() {
    if (this.content.indexOf('62') === 0) {
      this.content = `+${this.content}`;
    } else if (this.content[0] === '0') {
      this.content = `+62${this.content.substring(1)}`;
    } else if (this.content.charAt(0).match(/[0-9]/)) {
      this.content = `+62${this.content}`;
    }

    if (!!this.extension) {
      this.contentDisplay = `${this.content} Ext ${this.extension}`;
      this.content = `${this.content}, ${this.extension}`;
    } else {
      this.contentDisplay = this.content;
    }
  }

}
