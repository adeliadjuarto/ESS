import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarLgComponent } from './search-bar-lg.component';

describe('SearchBarLgComponent', () => {
  let component: SearchBarLgComponent;
  let fixture: ComponentFixture<SearchBarLgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarLgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
