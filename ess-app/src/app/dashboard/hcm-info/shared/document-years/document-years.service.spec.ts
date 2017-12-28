import { TestBed, inject } from '@angular/core/testing';

import { DocumentYearsService } from './document-years.service';

describe('DocumentYearsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentYearsService]
    });
  });

  it('should be created', inject([DocumentYearsService], (service: DocumentYearsService) => {
    expect(service).toBeTruthy();
  }));
});
