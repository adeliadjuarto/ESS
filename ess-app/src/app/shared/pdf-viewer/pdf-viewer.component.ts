import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, OnChanges {

  @Input() id: string;
  _id: string;
  pdfSrc: string;
  pdfViewerUrl: string= './assets/pdfJS/web/viewer.html?file=';
  pdfUrl: SafeResourceUrl;
  @ViewChild('pdfViewer') private viewer: ElementRef;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this._id = this.id;
    this.pdfSrc = `${this.pdfViewerUrl}/assets/${this._id}.pdf`;
    this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }

  ngOnChanges(changes: SimpleChanges) {
    const id: SimpleChange = changes.id;
    this._id = id.currentValue;
    this.pdfSrc = `${this.pdfViewerUrl}/assets/${this._id}.pdf`;
    this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }

  public get width(): number {
    return this.viewer.nativeElement.offsetWidth;
  }

  public get height(): number {
    return this.viewer.nativeElement.offsetHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.nativeElement.offsetWidth;
  }

  public getClassHeight() {
    return `calc(100% - ${(this.width > 600 ? 64 : 56)}px)`;
  }

}
