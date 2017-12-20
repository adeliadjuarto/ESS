import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payroll-viewer',
  templateUrl: './payroll-viewer.component.html',
  styleUrls: ['./payroll-viewer.component.scss']
})
export class PayrollViewerComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
  }

}
