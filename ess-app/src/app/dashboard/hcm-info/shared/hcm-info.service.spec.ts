import { TestBed, inject } from '@angular/core/testing';

import { HcmInfoService } from './hcm-info.service';

describe('HcmInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HcmInfoService]
    });
  });

  it('should be created', inject([HcmInfoService], (service: HcmInfoService) => {
    expect(service).toBeTruthy();
  }));
});
