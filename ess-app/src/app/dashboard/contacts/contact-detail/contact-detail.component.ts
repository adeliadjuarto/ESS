import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from './../shared/contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  employeeContact: Contact;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.employeeContact = this.route.snapshot.data['contact'];
  }
}
