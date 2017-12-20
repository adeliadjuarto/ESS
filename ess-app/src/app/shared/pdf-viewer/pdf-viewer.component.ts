import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @Input() id: string;
  pdfSrc: string = './assets/pdfJS/web/viewer.html?file=';
  pdfUrl: SafeResourceUrl;
  @ViewChild('pdfViewer') private viewer: ElementRef;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.pdfSrc = `${this.pdfSrc}/assets/${this.id}.pdf`;
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
