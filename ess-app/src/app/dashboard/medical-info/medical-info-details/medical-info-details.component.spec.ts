import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInfoDetailsComponent } from './medical-info-details.component';

describe('MedicalInfoDetailsComponent', () => {
  let component: MedicalInfoDetailsComponent;
  let fixture: ComponentFixture<MedicalInfoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalInfoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
