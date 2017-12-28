import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

import { HcmInfoService } from '../shared/hcm-info.service';
import { UITestingModule } from './../../../testing/ui-testing.module';
import { PkbComponent } from './pkb.component';

const mockStore = {
  select: jasmine.createSpy('select'),
  dispatch: jasmine.createSpy('dispatch')
};

const mockRouter = jasmine.createSpyObj('router', ['navigate']);
const mockRoute = {
  snapshot: {
    data: {
      documentYears: ['2017']
    }
  }
};
const mockService = jasmine.createSpyObj('service', ['fetchAllDocuments']);
const mockState = {
  documents: [{
    id: 1,
    title: 'mockTitle'
  }]
};

mockStore.select.and.returnValue(Observable.of(mockState));

fdescribe('PkbComponent', () => {
  let component: PkbComponent;
  let fixture: ComponentFixture<PkbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UITestingModule ],
      declarations: [ PkbComponent ],
      providers: [
        { provide: HcmInfoService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Store, useValue: mockStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should be created', () => {
    expect(component).toBeTruthy();
    expect(mockService.fetchAllDocuments).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(component.pkbList).toBeDefined();
  });

  fit('should call redirect on redirectToPkbViewer', () => {
    let mockPkb = {
      id: 1
    };

    component.redirectToPkbViewer(mockPkb);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
