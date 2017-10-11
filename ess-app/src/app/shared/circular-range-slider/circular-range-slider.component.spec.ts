import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularRangeSliderComponent } from './circular-range-slider.component';

describe('CircularRangeSliderComponent', () => {
  let component: CircularRangeSliderComponent;
  let fixture: ComponentFixture<CircularRangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularRangeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
