/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocsService } from './doc.service';

describe('Service: Doc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocsService]
    });
  });

  it('should ...', inject([DocsService], (service: DocsService) => {
    expect(service).toBeTruthy();
  }));
});
