import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDetailsCardComponent } from './medical-details-card.component';

describe('MedicalDetailsCardComponent', () => {
  let component: MedicalDetailsCardComponent;
  let fixture: ComponentFixture<MedicalDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
