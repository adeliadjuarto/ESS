import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkViewerComponent } from './sk-viewer.component';

describe('SkViewerComponent', () => {
  let component: SkViewerComponent;
  let fixture: ComponentFixture<SkViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
