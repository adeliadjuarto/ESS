import { TestBed, inject } from '@angular/core/testing';

import { PdfUrlService } from './pdf-url.service';

describe('DocumentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfUrlService]
    });
  });

  it('should be created', inject([PdfUrlService], (service: PdfUrlService) => {
    expect(service).toBeTruthy();
  }));
});
