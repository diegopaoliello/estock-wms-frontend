import { TestBed } from '@angular/core/testing';

import { EstoqueSaidaService } from './estoque-saida.service';

describe('EstoqueSaidaService', () => {
  let service: EstoqueSaidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueSaidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
