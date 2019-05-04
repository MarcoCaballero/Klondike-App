import { TestBed } from '@angular/core/testing';

import { MoveCardService } from './move-card.service';

describe('MoveCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoveCardService = TestBed.get(MoveCardService);
    expect(service).toBeTruthy();
  });
});
