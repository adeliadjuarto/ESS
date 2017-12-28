import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarXsComponent } from './search-bar-xs.component';

describe('SearchBarXsComponent', () => {
  let component: SearchBarXsComponent;
  let fixture: ComponentFixture<SearchBarXsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarXsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
