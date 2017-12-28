import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcmInfoComponent } from './hcm-info.component';

describe('HcmInfoComponent', () => {
  let component: HcmInfoComponent;
  let fixture: ComponentFixture<HcmInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcmInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcmInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
