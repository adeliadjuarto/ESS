import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementRequestComponent } from './reimbursement-request.component';

describe('ReimbursementRequestComponent', () => {
  let component: ReimbursementRequestComponent;
  let fixture: ComponentFixture<ReimbursementRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
