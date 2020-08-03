import { TestBed } from '@angular/core/testing';

import { BackendApisService } from './backend-apis.service';

describe('BackendApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendApisService = TestBed.get(BackendApisService);
    expect(service).toBeTruthy();
  });
});
