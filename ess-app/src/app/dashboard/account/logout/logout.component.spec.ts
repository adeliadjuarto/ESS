import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginService } from '../../../login/shared/login.service';
import { LogoutComponent } from './logout.component';

const login = jasmine.createSpyObj('LoginService', ['logout']);
const router = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      providers: [
        { provide: LoginService, useValue: login },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout and navigate to login page', () => {
    component.logout();

    expect(login.logout).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });
});
