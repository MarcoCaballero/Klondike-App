import { TestBed } from '@angular/core/testing';

import { StartService } from './start.service';
import { Board } from '../model/board';

describe('StartService', () => {
  let board : Board;
  let startService : StartService ;
  beforeEach(() => { 
    startService = new StartService();
    board = startService.buildBoard();
    startService.start();
  });
  afterEach(() => {
    startService = null; 
    board = null;
  });
  it('should create an instance', () => {
    expect(startService).toBeTruthy();
  });
  
  it('should create a new board', () => {
    expect(board).toBeTruthy();
  });
  
  it('should build the stock and waste and shuffle stock', () => {
    expect(board._stock).toBeTruthy();
    expect(board._stock.size() > 0).toBeTruthy();
    expect(board._stock.size() < 52).toBeTruthy();

    expect(board._waste).toBeTruthy();
    expect(board._waste.empty()).toBeTruthy();
    });

  it('should deal to all the tableaus', () => { 
    for(let n = 0; n < board._tableaus.length; n++){
      expect(board._tableaus[n].empty()).toBeFalsy(); 
    }
    });

  it('should build one empty foundation per suit', () => {
    for(let n = 0; n < board._foundations.length; n++){
      for(let m = 0; m < board._foundations.length; m++){
        if (n!== m){
          expect(board._foundations[n].suit !== board._foundations[m].suit).toBeTruthy();
        }
      }
    }
    });
});
