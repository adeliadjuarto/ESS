import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UITestingModule } from './../../../../testing/ui-testing.module';
import { PkbViewerComponent } from './pkb-viewer.component';

const mockRoute = {
  snapshot: {
    data: {
      url: 'mockUrl'
    }
  }
}

describe('PkbViewerComponent', () => {
  let component: PkbViewerComponent;
  let fixture: ComponentFixture<PkbViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UITestingModule ],
      declarations: [ PkbViewerComponent, MockPDFViewerComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkbViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(component.url).toEqual('mockUrl');
  });
});

@Component({
  selector: 'app-pdf-viewer',
  template: '<p>Mock PDF Viewer</p>'
})
export class MockPDFViewerComponent {
  @Input() url: string;
}