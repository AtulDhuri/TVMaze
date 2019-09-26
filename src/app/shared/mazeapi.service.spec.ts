import { TestBed, inject } from '@angular/core/testing';

import { MazeapiService } from './mazeapi.service';

describe('MazeapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MazeapiService]
    });
  });

  it('should be created', inject([MazeapiService], (service: MazeapiService) => {
    expect(service).toBeTruthy();
  }));
});
