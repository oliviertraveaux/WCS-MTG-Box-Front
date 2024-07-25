import { TestBed } from '@angular/core/testing';

import { HomeSearchResultsService } from './home-search-results.service';

describe('HomeSearchResultsService', () => {
  let service: HomeSearchResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSearchResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
