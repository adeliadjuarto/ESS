import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInfoComponent } from './medical-info.component';

describe('MedicalInfoComponent', () => {
  let component: MedicalInfoComponent;
  let fixture: ComponentFixture<MedicalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
