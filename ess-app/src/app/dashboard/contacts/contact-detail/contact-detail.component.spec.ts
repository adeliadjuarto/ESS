import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UITestingModule } from './../../../testing/ui-testing.module';
import { ContactDetailComponent } from './contact-detail.component';

const mockRoute = {
  snapshot: {
    data: {
      contact: {
        name: 'mockUser',
        jobTitle: {
          name: 'mockJobTitle'
        },
        branch: {
          name: 'mockBranch'
        },
        region: {
          name: 'mockRegion'
        },
        phoneNumber: [{
          icon: 'mockIcon',
          number: '123',
          extension: '456'
        }]
      }
    }
  }
};

describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ UITestingModule ],
      declarations: [ ContactDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(component.employeeContact).toEqual(mockRoute.snapshot.data.contact);
  });
});
