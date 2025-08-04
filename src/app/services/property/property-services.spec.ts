import { TestBed } from '@angular/core/testing';

import { PropertyServices } from './property-services';

describe('PropertyServices', () => {
  let service: PropertyServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
