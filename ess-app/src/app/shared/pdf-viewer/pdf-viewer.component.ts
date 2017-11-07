import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewersComponent implements OnInit {

  @Input() public pdfSrc = '/assets/sample.pdf';

  constructor() { }

  ngOnInit() {
  }

}
