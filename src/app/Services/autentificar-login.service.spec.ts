import { TestBed } from '@angular/core/testing';

import { AutentificarLoginService } from './autentificar-login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AutentificarLoginService', () => {
  let service: AutentificarLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(AutentificarLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
