import { TestBed, inject } from '@angular/core/testing';

import { SearchFilterService } from './search-filter.service';

describe('SearchFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFilterService]
    });
  });

  it('should be created', inject([SearchFilterService], (service: SearchFilterService) => {
    expect(service).toBeTruthy();
  }));
});
