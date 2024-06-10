import { TestBed } from '@angular/core/testing';

import { OfferCardBasketService } from './offer-card-basket.service';

describe('OfferCardBasketService', () => {
  let service: OfferCardBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferCardBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
