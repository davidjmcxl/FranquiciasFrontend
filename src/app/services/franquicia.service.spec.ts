import { TestBed } from '@angular/core/testing';

import { FranquiciaService } from './franquicia.service';

describe('FranquiciaService', () => {
  let service: FranquiciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranquiciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
