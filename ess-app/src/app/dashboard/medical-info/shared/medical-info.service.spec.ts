import { TestBed, inject } from '@angular/core/testing';

import { MedicalInfoService } from './medical-info.service';

describe('MedicalInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalInfoService]
    });
  });

  it('should be created', inject([MedicalInfoService], (service: MedicalInfoService) => {
    expect(service).toBeTruthy();
  }));
});
