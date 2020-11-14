/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CandidatesService } from './candidate.service';

describe('Service: Doc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatesService]
    });
  });

  it('should ...', inject([CandidatesService], (service: CandidatesService) => {
    expect(service).toBeTruthy();
  }));
});
