import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkListComponent } from './sk-list.component';

describe('SkListComponent', () => {
  let component: SkListComponent;
  let fixture: ComponentFixture<SkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
