import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInfoDetailMapComponent } from './medical-info-detail-map.component';

describe('MedicalInfoDetailMapComponent', () => {
  let component: MedicalInfoDetailMapComponent;
  let fixture: ComponentFixture<MedicalInfoDetailMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalInfoDetailMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalInfoDetailMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
