/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ClientService } from './cliente.service';

describe('Service: Cliente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientService]
    });
  });

  it('should ...', inject([ClientService], (service: ClientService) => {
    expect(service).toBeTruthy();
  }));
});
