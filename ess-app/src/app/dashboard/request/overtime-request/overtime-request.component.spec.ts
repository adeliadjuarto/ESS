import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeRequestComponent } from './overtime-request.component';

describe('OvertimeRequestComponent', () => {
  let component: OvertimeRequestComponent;
  let fixture: ComponentFixture<OvertimeRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
