import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollViewerComponent } from './payroll-viewer.component';

describe('PayrollViewerComponent', () => {
  let component: PayrollViewerComponent;
  let fixture: ComponentFixture<PayrollViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
