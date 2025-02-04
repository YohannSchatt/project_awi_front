import { TestBed } from '@angular/core/testing';

import { CatalogueService2 } from './catalogue2.service';

describe('CatalogueService2', () => {
  let service: CatalogueService2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogueService2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
