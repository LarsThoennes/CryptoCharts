import { TestBed } from '@angular/core/testing';

import { FetchCryptoDataService } from './fetch-crypto-data.service';

describe('FetchCryptoDataService', () => {
  let service: FetchCryptoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCryptoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
